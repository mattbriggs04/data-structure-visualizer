import { useEffect, useState } from 'react';

interface OperationAnimation<T> {
    sequence: number;
    visitedNodeIds: T[];
    focusNodeId: T | null;
    accentNodeIds?: T[];
}

function useOperationAnimation<T>(operation: OperationAnimation<T> | null, stepMs: number = 320, lingerMs: number = 1400) {
    const [activeNodeIds, setActiveNodeIds] = useState<Set<T>>(new Set());
    const [focusNodeId, setFocusNodeId] = useState<T | null>(null);
    const [accentNodeIds, setAccentNodeIds] = useState<Set<T>>(new Set());

    useEffect(() => {
        if(operation === null) {
            setActiveNodeIds(new Set());
            setFocusNodeId(null);
            setAccentNodeIds(new Set());
            return;
        }

        const timers: number[] = [];
        setActiveNodeIds(new Set());
        setFocusNodeId(null);
        setAccentNodeIds(new Set());

        operation.visitedNodeIds.forEach((nodeId, idx) => {
            timers.push(window.setTimeout(() => {
                setActiveNodeIds((prev) => {
                    const next = new Set(prev);
                    next.add(nodeId);
                    return next;
                });
            }, idx * stepMs));
        });

        const focusDelay = operation.visitedNodeIds.length * stepMs + 120;
        if(operation.focusNodeId !== null) {
            timers.push(window.setTimeout(() => {
                setFocusNodeId(operation.focusNodeId);
            }, focusDelay));
        }

        if(operation.accentNodeIds !== undefined && operation.accentNodeIds.length > 0) {
            timers.push(window.setTimeout(() => {
                setAccentNodeIds(new Set(operation.accentNodeIds));
            }, focusDelay + 180));
        }

        timers.push(window.setTimeout(() => {
            setActiveNodeIds(new Set());
            setFocusNodeId(null);
            setAccentNodeIds(new Set());
        }, focusDelay + lingerMs));

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer));
        };
    }, [operation, stepMs, lingerMs]);

    return {
        activeNodeIds,
        focusNodeId,
        accentNodeIds,
    };
}

export default useOperationAnimation;

import { Payload, Store } from "almin";
import { Entity, Repository } from "ddd-base";

type GetEntityType<R> = R extends Repository<infer T> ? T : never;
type GetEntityTypes<Repositories> = { [P in keyof Repositories]: GetEntityType<Repositories[P]> };

type PayloadHandler = (payload: Payload) => any;
type EntityHandler<State, Repos extends Entity<any>[]> = (state: State, entities: Repos) => any;
type Disposable = {
    dispose: () => void;
};
export function createHooks<State, T1 extends Repository<any>>(
    store: Store<State>,
    repositories: [T1]
): {
    usePayload: (handler: PayloadHandler) => any;
    useEntity: (handler: EntityHandler<State, [GetEntityType<T1>]>) => any;
    disposable: Disposable;
};
export function createHooks<State, T1 extends Repository<any>, T2 extends Repository<any>>(
    store: Store<State>,
    repositories: [T1, T2]
): {
    usePayload: (handler: PayloadHandler) => any;
    useEntity: (handler: EntityHandler<State, [GetEntityType<T1>, GetEntityType<T2>]>) => any;
    disposable: Disposable;
};
export function createHooks<State, T1 extends Repository<any>, T2 extends Repository<any>, T3 extends Repository<any>>(
    store: Store<State>,
    repositories: [T1, T2, T3]
): {
    usePayload: (handler: PayloadHandler) => any;
    useEntity: (handler: EntityHandler<State, [GetEntityType<T1>, GetEntityType<T2>, GetEntityType<T3>]>) => any;
    disposable: Disposable;
};
export function createHooks<
    State,
    T1 extends Repository<any>,
    T2 extends Repository<any>,
    T3 extends Repository<any>,
    T4 extends Repository<any>
>(
    store: Store<State>,
    repositories: [T1, T2, T3, T4]
): {
    usePayload: (handler: PayloadHandler) => any;
    useEntity: (
        handler: EntityHandler<State, [GetEntityType<T1>, GetEntityType<T2>, GetEntityType<T3>, GetEntityType<T4>]>
    ) => any;
    disposable: Disposable;
};
export function createHooks<
    State,
    T1 extends Repository<any>,
    T2 extends Repository<any>,
    T3 extends Repository<any>,
    T4 extends Repository<any>,
    T5 extends Repository<any>
>(
    store: Store<State>,
    repositories: [T1, T2, T3, T4, T5]
): {
    usePayload: (handler: PayloadHandler) => any;
    useEntity: (
        handler: EntityHandler<
            State,
            [GetEntityType<T1>, GetEntityType<T2>, GetEntityType<T3>, GetEntityType<T4>, GetEntityType<T5>]
        >
    ) => any;
    disposable: Disposable;
};
export function createHooks<
    State,
    T1 extends Repository<any>,
    T2 extends Repository<any>,
    T3 extends Repository<any>,
    T4 extends Repository<any>,
    T5 extends Repository<any>,
    T6 extends Repository<any>
>(
    store: Store<State>,
    repositories: [T1, T2, T3, T4, T5, T6]
): {
    usePayload: (handler: PayloadHandler) => any;
    useEntity: (
        handler: EntityHandler<
            State,
            [
                GetEntityType<T1>,
                GetEntityType<T2>,
                GetEntityType<T3>,
                GetEntityType<T4>,
                GetEntityType<T5>,
                GetEntityType<T6>
            ]
        >
    ) => any;
    disposable: Disposable;
};
export function createHooks<State, Repositories extends Repository<any>[]>(
    store: Store<State>,
    repositories: Repositories
): {
    usePayload: (handler: PayloadHandler) => any;
    useEntity: (handler: (state: State, entities: any[]) => any) => any;
    disposable: Disposable;
} {
    const disposes: (() => void)[] = [];
    const createUsePayload = <State>(store: Store<State>) => {
        return (handler: PayloadHandler) => {
            const payloadHandlers: PayloadHandler[] = [];
            const disposeOnDispatch = store.onDispatch(payload => {
                payloadHandlers.forEach(handler => handler(payload));
            });
            disposes.push(disposeOnDispatch);
            payloadHandlers.push(handler);
        };
    };
    const getEntries = () => {
        return repositories.map(repository => {
            return repository.get();
        });
    };
    type DomainHandler = (state: State, entries: GetEntityTypes<Repositories>) => any;
    const createUseEntity = () => {
        const domainHandlers: DomainHandler[] = [];
        repositories.forEach(repository => {
            const disposeOnSave = repository.events.onSave(() => {
                domainHandlers.forEach(handler => {
                    handler(store.getState(), getEntries() as any);
                });
            });
            disposes.push(disposeOnSave);
        });
        return (handler: DomainHandler) => {
            domainHandlers.push(handler);
        };
    };
    return {
        usePayload: createUsePayload(store),
        useEntity: createUseEntity(),
        disposable: {
            dispose: () => {
                disposes.forEach(dispose => dispose());
            }
        }
    };
}

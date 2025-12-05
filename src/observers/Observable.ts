import type { Observer } from "./Observer";

export abstract class Observable {
    private observers: Observer[] = [];

    public addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    protected notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}


import { Observer } from "../observers/Observer";
import { Triangle } from "../entities/TriangleEntity";
import { Tetrahedron } from "../entities/TetrahedronEntity";
import { Shape } from "../entities/Shape";
import { TriangleCalculator } from "../services/TriangleCalculator";
import { TetrahedronCalculator } from "../services/TetrahedronCalculator";
import { logger } from "../logger/logger";
import { CalculationError } from "../exceptions/CalculationError";



export type Metrics = {
    area?: number;
    perimeter?: number;
    volume?: number;
    surfaceArea?: number;
    extra?: Record<string, any>;
};

export class Warehouse implements Observer {

    private static instance: Warehouse | null = null;

    private storage: Map<string, Metrics> = new Map();

    private triCalc = new TriangleCalculator();
    private tetCalc = new TetrahedronCalculator();

    private constructor() {

    }

    public static getInstance(): Warehouse {
        if (!Warehouse.instance) {
            Warehouse.instance = new Warehouse();
        }
        return Warehouse.instance;
    }


    public update(observable: any): void {
        try {

            if (!observable || typeof observable.id !== "string") {
                logger.warn({ observable }, "Warehouse.update: observable has no id, skipping");
                return;
            }

            this.recalculate(observable);
        } catch (err: any) {
            logger.error({ err, observable }, "Warehouse.update failed");
            
            throw new CalculationError("Warehouse: update failed");
        }
    }

    public register(figure: Shape): void {
        try {

            if (typeof (figure as any).addObserver === "function") {
                (figure as any).addObserver(this);
            } else {
                logger.warn({ figure }, "Warehouse.register: figure has no addObserver");
            }


            this.recalculate(figure);
        } catch (err: any) {
            logger.error({ err, figure }, "Warehouse.register failed");
            throw new CalculationError("Warehouse: register failed");
        }
    }


    public unregister(figure: Shape): void {
        try {
            if (typeof (figure as any).removeObserver === "function") {
                (figure as any).removeObserver(this);
            } else {
                logger.warn({ figure }, "Warehouse.unregister: figure has no removeObserver");
            }

            this.storage.delete(figure.id);
        } catch (err: any) {
            logger.error({ err, figure }, "Warehouse.unregister failed");
            throw new CalculationError("Warehouse: unregister failed");
        }
    }

    public get(id: string): Metrics | undefined {
        return this.storage.get(id);
    }


    public getAll(): Array<{ id: string; metrics: Metrics }> {
        const res: Array<{ id: string; metrics: Metrics }> = [];
        for (const [id, metrics] of this.storage.entries()) {
            res.push({ id, metrics });
        }
        return res;
    }

    public remove(id: string): void {
        this.storage.delete(id);
    }


public clear(): void {
    this.storage.clear(); 
}

    public dump(): any {
        return this.getAll();
    }


    public getTriangleArea(id: string): number | undefined {
        return this.storage.get(id)?.area;
    }


    
    private recalculate(figure: any): void {
        try {
            const id: string = figure.id;
            const metrics: Metrics = {};

            if (figure instanceof Triangle) {
                
                const area = this.triCalc.area(figure);

                const perimeter = this.triCalc.perimeter(figure);
                metrics.area = area;
                metrics.perimeter = perimeter;
                metrics.extra = {
                    isIsosceles: this.triCalc.isIsosceles(figure),
                    isEquilateral: this.triCalc.isEquilateral(figure),
                    isRight: this.triCalc.isRight(figure),
                    isAcute: this.triCalc.isAcute(figure),
                    isObtuse: this.triCalc.isObtuse(figure),
                };
            }
            
            else if (figure instanceof Tetrahedron) {
                const volume = this.tetCalc.volume(figure);
                const surfaceArea = this.tetCalc.surfaceArea(figure);
                metrics.volume = volume;
                metrics.surfaceArea = surfaceArea;

                metrics.extra = {
                    basePlanes: this.tetCalc.baseLiesOnCoordinatePlane(figure),
                    ratios: {
                        XY: this.tetCalc.volumeRatio(figure, "XY"),
                        YZ: this.tetCalc.volumeRatio(figure, "YZ"),
                        XZ: this.tetCalc.volumeRatio(figure, "XZ"),
                    },
                };
            } else {
                
                logger.warn({ figure }, "Warehouse.recalculate: unknown figure type");
            }

            
            this.storage.set(id, metrics);
            logger.debug({ id, metrics }, "Warehouse updated metrics");

        } catch (err: any) {
            logger.error({ err, figure }, "Warehouse.recalculate failed");
            throw new CalculationError("Warehouse: recalculate failed");
        }
    }
}

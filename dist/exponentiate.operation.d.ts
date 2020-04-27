import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
export declare class ExponentiateOperation extends TransformPlugin {
    options: ExponentiateOperationPluginOptions;
    inputs: ExponentiateOperationPluginInputs;
    inputData?: PluginData;
    power: number;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    submit(pluginData: PluginData): void;
    setPower(adder: number): void;
}
declare class ExponentiateOperationPluginInputs extends PluginInputs {
    converter: ExponentiateOperation;
    constructor(converter: ExponentiateOperation);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class ExponentiateOperationPluginOptions extends PluginOptions {
    operation: ExponentiateOperation;
    state: number;
    constructor(operation: ExponentiateOperation);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};

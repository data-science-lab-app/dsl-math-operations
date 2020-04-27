import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
export declare class MultiplyFeaturesOperation extends TransformPlugin {
    options: MultiplyFeaturesOperationPluginOptions;
    inputs: MultiplyFeaturesOperationPluginInputs;
    inputData?: PluginData;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    submit(pluginData: PluginData): void;
}
declare class MultiplyFeaturesOperationPluginInputs extends PluginInputs {
    converter: MultiplyFeaturesOperation;
    constructor(converter: MultiplyFeaturesOperation);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class MultiplyFeaturesOperationPluginOptions extends PluginOptions {
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};

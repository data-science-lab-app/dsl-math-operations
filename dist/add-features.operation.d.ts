import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';
export declare class AddFeaturesOperation extends TransformPlugin {
    options: AddFeaturesOperationPluginOptions;
    inputs: AddFeaturesOperationPluginInputs;
    inputData?: PluginData;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    submit(pluginData: PluginData): void;
}
declare class AddFeaturesOperationPluginInputs extends PluginInputs {
    converter: AddFeaturesOperation;
    constructor(converter: AddFeaturesOperation);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class AddFeaturesOperationPluginOptions extends PluginOptions {
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};

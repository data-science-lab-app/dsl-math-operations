import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';

export class MultiplyFeaturesOperation extends TransformPlugin {

    options: MultiplyFeaturesOperationPluginOptions;
    inputs: MultiplyFeaturesOperationPluginInputs;

    inputData?: PluginData;

    constructor() {
        super();
        this.options = new MultiplyFeaturesOperationPluginOptions();
        this.inputs = new MultiplyFeaturesOperationPluginInputs(this);
    }

    getOptions(): PluginOptions {
        return this.options;
    }
    getInputs(): PluginInputs {
        return this.inputs;
    }

    transform(): PluginData | PluginData[] {
        if (this.inputData) {
            return {
                features: [this.inputData.features.join(' x ')],
                examples: this.inputData.examples.map(example =>
                    [
                        example.reduce((accumlator, current) => accumlator * current)
                    ]
                )
            }
        }
        throw new Error('Multiply Features Operation didn\'t get any inputs.')
    }

    submit(pluginData: PluginData) {
        this.inputData = pluginData;
    }

}

class MultiplyFeaturesOperationPluginInputs extends PluginInputs {
    constructor(public converter: MultiplyFeaturesOperation) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        this.converter.submit(inputs['features']);
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'features',
                label: 'Features to multiply together',
                min: 2,
                type: 'number'
            }
        ];
    }
}

class MultiplyFeaturesOperationPluginOptions extends PluginOptions {
    submit(inputs: { [id: string]: any; }): void {
        throw new Error("Multiply Features Operation has no submit options.");
    }
    options(): Option[] {
        throw new Error("Multiply Features Operation has no options.");
    }
    noMore(): boolean {
        return true;
    }

}

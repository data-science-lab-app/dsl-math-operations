import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginDataInput, PluginData } from 'data-science-lab-core';


export class AddFeaturesOperation extends TransformPlugin {

    options: AddFeaturesOperationPluginOptions;
    inputs: AddFeaturesOperationPluginInputs;

    inputData?: PluginData;

    constructor() {
        super();
        this.options = new AddFeaturesOperationPluginOptions();
        this.inputs = new AddFeaturesOperationPluginInputs(this);
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
                features: [this.inputData.features.join(' + ')],
                examples: this.inputData.examples.map(example =>
                    [
                        example.reduce((accumlator, current) => accumlator + current)
                    ]
                )
            }
        }
        throw new Error('Add Features Operation didn\'t get any inputs.')
    }

    submit(pluginData: PluginData) {
        this.inputData = pluginData;
    }

}

class AddFeaturesOperationPluginInputs extends PluginInputs {
    constructor(public converter: AddFeaturesOperation) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        this.converter.submit(inputs['features']);
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'features',
                label: 'Features to add together',
                min: 2,
                type: 'number'
            }
        ];
    }
}

class AddFeaturesOperationPluginOptions extends PluginOptions {
    submit(inputs: { [id: string]: any; }): void {
        throw new Error("Add Features Operation has no submit options.");
    }
    options(): Option[] {
        throw new Error("Add Features Operation has no options.");
    }
    noMore(): boolean {
        return true;
    }

}

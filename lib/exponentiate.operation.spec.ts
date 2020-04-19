import { ExponentiateOperation } from './exponentiate.operation';

describe('Exponentiate Operation Tests', () => {
    let converter: ExponentiateOperation;

    beforeEach(() => {
        converter = new ExponentiateOperation();
    });

    it('options should return true for no more', () => {
        expect(converter.getOptions().noMore()).toBeFalsy();
    }); 

    it('opthons should return a list of one', () => {
        expect(converter.getOptions().options().length).toBe(1);
    });

    it('inputs should return one inputs', () => {
        expect(converter.getInputs().inputs().length).toBe(1);
    });

    it('submitting a list of numbers and power should exponentiate', () => {
        converter.getInputs().submit({
            'features': 
            {
                features: ['f1'],
                examples: [[1], [2]]
            }
        });
        converter.getOptions().submit({
            'number': 2
        });
        expect(converter.getOptions().noMore).toBeTruthy();

        const data = converter.transform();
        expect(data).toEqual(
            {
                features: ['f1'],
                examples: [[1], [4]]
            }
        );
    });

    
    it('submitting three list of numbers and power should exponentiate', () => {
        converter.getInputs().submit({
            'features': 
            {
                features: ['f1', 'f2', 'f3'],
                examples: [[1, 2, 3], [4, 5, 6]]
            }
        });
        converter.getOptions().submit({
            'number': 2
        });
        expect(converter.getOptions().noMore).toBeTruthy();

        const data = converter.transform();
        expect(data).toEqual(
            {
                features: ['f1', 'f2', 'f3'],
                examples: [[1, 4, 9], [16, 25, 36]]
            }
        );
    });
    

});


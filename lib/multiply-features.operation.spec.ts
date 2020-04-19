import { MultiplyFeaturesOperation } from "./multiply-features.operation"

describe('Multiply Features Operation Tests', () => {
    let converter: MultiplyFeaturesOperation;

    beforeEach(() => {
        converter = new MultiplyFeaturesOperation();
    });

    it('options should return true for no more', () => {
        expect(converter.getOptions().noMore()).toBeTruthy();
    });

    it('options should throw for options', (done) => {
        try {
            converter.getOptions().options();
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('options should throw for submit', (done) => {
        try {
            converter.getOptions().submit({});
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('inputs should return one inputs', () => {
        expect(converter.getInputs().inputs().length).toBe(1);
    });

    it('submit a two list of numbers should multiply them together', () => {
        converter.getInputs().submit({
            'features':
            {
                features: ['f1', 'f2'],
                examples: [[1, 2], [3, 4]]
            }
        })
        const data = converter.transform();
        expect(data).toEqual(
            {
                features: ['f1 x f2'],
                examples: [[2], [12]]
            }
        )
    });

    it('submit three list of numbers should multiply them together', () => {
        converter.getInputs().submit({
            'features':
            {
                features: ['f1', 'f2', 'f3'],
                examples: [[1, 2, 3], [4, 5, 6]]
            }
        })
        const data = converter.transform();
        expect(data).toEqual(
            {
                features: ['f1 x f2 x f3'],
                examples: [[6], [120]]
            }
        )
    });


});


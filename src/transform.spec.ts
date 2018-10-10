import { expect } from 'chai';
import { transform } from './transform';

describe('Transform', () => {
  it('transforms the template', done => {
    const event = {
      region: 'us-east-1',
      accountId: 'XXXYYYZZZ',
      fragment: {
        AWSTemplateFormatVersion: '2010-09-09',
        Resources: {
          ExampleStateMachineWithOutDef: {
            Type: 'AWS::StepFunctions::StateMachine',
            Properties: {
              DefinitionString: 'ABC',
            },
          },
          ExampleStateMachine: {
            Type: 'AWS::StepFunctions::StateMachine',
            Properties: {
              Definition: {
                Comment: 'PIRSA Prawn Report Report State Machine',
                StartAt: 'Test',
                States: [
                  {
                    Test: {
                      Type: 'Pass',
                      Result: 'Done',
                      End: true,
                    },
                  },
                ],
              },
            },
          },
          ExampleStateMachineRole: {
            Type: 'AWS::Other::Resource',
            Properties: {
              Amount: 5,
            },
          },
        },
      },
      transformId: 'XXX::ParseDefinitionString',
      params: {},
      requestId: '000-111-222',
    };
    transform(event, null, (err: any, data: any) => {
      expect(data).to.deep.eq({
        status: 'success',
        requestId: '000-111-222',
        fragment: {
          AWSTemplateFormatVersion: '2010-09-09',
          Resources: {
            ExampleStateMachineWithOutDef: {
              Type: 'AWS::StepFunctions::StateMachine',
              Properties: {
                DefinitionString: 'ABC',
              },
            },
            ExampleStateMachine: {
              Type: 'AWS::StepFunctions::StateMachine',
              Properties: {
                DefinitionString: {
                  'Fn::Sub':
                    '{"Comment":"PIRSA Prawn Report Report State Machine","StartAt":"Test","States":[{"Test":{"Type":"Pass","Result":"Done","End":true}}]}',
                },
              },
            },
            ExampleStateMachineRole: {
              Type: 'AWS::Other::Resource',
              Properties: {
                Amount: 5,
              },
            },
          },
        },
      });
      expect(err).null;
      done();
    });
  });
});

export function transform(event: any, ctx: any, callback: Function) {
  // Find instances of StateMachines
  const StateMachines = Object.keys(event.fragment.Resources)
    .map(name => ({ name, resource: event.fragment.Resources[name] }))
    // only care about state machines
    .filter(
      ({ resource }) => resource.Type === 'AWS::StepFunctions::StateMachine'
    )
    // only care about those with Definition
    .filter(({ resource }) => !!resource.Properties.Definition);

  // Parse each of the definitions
  StateMachines.forEach(stateMachine => {
    event.fragment.Resources[
      stateMachine.name
    ].Properties.DefinitionString = JSON.stringify(
      stateMachine.resource.Properties.Definition
    );
    delete event.fragment.Resources[stateMachine.name].Properties.Definition;
  });

  callback(null, {
    status: 'success',
    requestId: event.requestId,
    fragment: event.fragment,
  });
}

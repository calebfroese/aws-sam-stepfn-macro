export function transform(event: any, ctx: any, callback: Function) {
  console.log(event);
  console.log(JSON.stringify(event));
  callback(null, {
    status: 'success',
    requestId: event.requestId,
    fragment: 'test',
  });
}

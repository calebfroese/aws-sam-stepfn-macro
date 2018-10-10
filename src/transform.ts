export function transform(event: any, ctx: any, callback: Function) {
  console.log(event);
  console.log(JSON.stringify(event));
  callback(null, event.fragment);
}

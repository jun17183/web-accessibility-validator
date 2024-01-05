import Box from './Box';

export default function Left() {
  const codeStr = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
      <div>
        <h1>hello</h1>
      </div>
      <div>
        <h1>hello</h1>
      </div>
      <div>
        <h1>hello</h1>
      </div><div>
        <h1>hello</h1>
      </div>
      <div>
        <h1>hello</h1>
      </div>
      <div>
        <h1>hello</h1>
      </div>
      <div>
        <h1>hello</h1>
      </div>
      <div>
        <h1>hello</h1>
      </div>
      <div>
        <h1>hello</h1>
      </div>
      <div>
        <h1>hello</h1>
      </div>
    </body>
  `;

  return (
    <Box title='Your Code' codeStr={codeStr} />
  );
}
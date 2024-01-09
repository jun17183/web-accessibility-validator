import { useEffect, useState } from 'react';

import { parseDOM } from 'htmlparser2';
import { createElement } from 'react';

import Left from './Left';
import Right from './Right';

export default function Result() {
  const [selectedCode, setSelectedCode] = useState('');

  const language = 'html';
  const htmlStr = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
      <img src='' />
      <div>
        <h1>111</h1>
      </div>
      <div>
        <h2>222</h2>
      </div>
      <div>
        <h3>333</h3>
      </div>
      <div>
        <h4>444</h4>
      </div>
    </body>
    </html>
  `;

  const dom = parseDOM(htmlStr);

  console.log(dom);

  return (
    <div className='flex items-center justify-center gap-x-10 h-full w-screen min-w-500px'>
      <Left language={language} code={htmlStr} />
      <Right language={language} />
    </div>
  );
}

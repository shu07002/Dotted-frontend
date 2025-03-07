import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
vertical-align: baseline;
box-sizing: border-box;
}
*{
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  font-family: 'Pretendard', sans-serif;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
display: block;
}
body {
line-height: 1;
box-sizing: border-box;
overflow-x:hidden;
}
ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: '';
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}

u {
  text-decoration:underline;
}

em{
  font-style:italic;
}


strong {
    font-weight:bold
}


button {
  cursor:pointer;
  border:none;
  background-color:transparent;
  
}

h1 {
  font-size: 32px;
}

h2 {
  font-size: 24px;
}

h3 {
  font-size: 18.72px;
}

h4 {
  font-size: 16px;
}

p{
  font-size: 16px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox  */
input[type='number'] {
  -moz-appearance: textfield;
}
`;

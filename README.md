# My Resume

## See It Live

This repo has been configured with GitHub Pages. Access its page here: <https://t-mart.github.io/resume/>.

## Usage

- `npm run develop` will start a webserver at <http://localhost:8080>.
  - On this page is a "paper" representation of the resume in HTML. There's also a toolbar to tell
  you if the resume is one page or not. This is useful for development because the webpack dev
  server will autoreload on change and you can get quick feedback.
  - There's also a PDF version (final distributable product) is available at
  <http://localhost:8080/index.pdf>.
- `npm run build` outputs a static version of the above assets without starting the webpack dev server.
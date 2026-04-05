<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ config('app.name') }}</title>
    <meta name="description" content="Learning support that scales with every student — {{ config('app.name') }}" />
    @viteReactRefresh
    @vite('resources/js/main.jsx')
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

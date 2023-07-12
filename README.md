# Westlake Timeline

**[Read the story](https://www.muckrock.com/news/archives/2023/jul/12/st-louis-landfill-toxic-superfund/)**. You can also [republish it](https://www.muckrock.com/news/archives/2023/jul/12/st-louis-landfill-toxic-superfund/republish/). Here's the embed code for the map itself:

```html
<div id="westlake-timeline"></div>
<link href="https://muckrock.github.io/westlake-timeline/assets/style.css" rel="stylesheet" />
<script src="https://muckrock.github.io/westlake-timeline/assets/main.js" type="module"></script>
```

This project shows a timeline and locations around St. Louis, Missouri, where nuclear waste was stored after World War II. It uses [Ulysses], [Mapbox] and [Svelte]. The map was designed and edited using [Felt].

## Run it

This project requires a recent version of [Node] to run. Once built, it's entirely static. You'll also need a [Felt API token] and Mapbox access token.

```sh
# for pulling data from Felt
export FELT_ACCESS_TOKEN="..."

# this will be bundled with the code
export VITE_MAPBOX_ACCESS_TOKE="..."

# install dependencies
make install

# update content
make update

# build a static version
make build

# preview static version
make preview
```

The final version lives on Github Pages and is published via Github Actions.

[Ulysses]: https://github.com/eyeseast/ulysses-js
[Mapbox]: https://docs.mapbox.com/mapbox-gl-js/guides/
[Svelte]: https://svelte.dev
[Felt]: https://felt.com
[Felt API token]: https://feltmaps.notion.site/Getting-Started-With-The-Felt-API-69c8b02b7d8e436daa657a04a2dbaffa
[Node]: https://nodejs.org/

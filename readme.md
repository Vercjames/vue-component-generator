# vue-component-generator
CLI utility function for creating Vue.js templates.

## Installation

```console
$ npm install -g vue-comp-generator
```

## Basic Generation

Run the following command to receive terminal instructions

```console
$ vuegc
```

## Quick Generation

Run the following command to bypass the terminal instructions

```console
$ vuegc mycomp
```

## File Scaffolding

Use the **-** sign to delineate between the folder and files naming conventions. The result will be the following scaffolding:

```console
$ vuegc route-home
```

* ```route-home```
    * ```home.js```
    * ```home.scss```
    * ```home.vue```

## Mac Template

Feel free to change the generated templates which are located here.

* /usr/local/lib/node_modules/vue-comp-generator/
* /usr/local/lib/node_modules/vue-component-generator/

## Windows Template

Feel free to change the generated templates which are located here.

* C:\Users\{{localuser}}\AppData\Roaming\npm\node_modules\vue-comp-generator\template

## Generated Templates

**Example**

```console
$ vuegc home
```

Will create the following three files:

**home.js**
```javascript
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
  }
}
```

**home.scss**
```scss
section {

}
```

**home.vue**
```html
<style src="./home.scss" type="text/scss" lang="scss" scoped></style>
<script src="./home.js" type="text/javascript"></script>

<template>
  <section>
    <main>

    </main>
  </section>
</template>
```
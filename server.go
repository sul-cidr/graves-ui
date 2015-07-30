package main

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

func main() {

	m := martini.Classic()
	m.Use(render.Renderer())

	m.Get("/", func(r render.Render) {
		r.HTML(200, "home", nil)
	})

	m.Run()

}

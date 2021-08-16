import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

/*

const store = {
  "links": [
    {
      "id": 1,
      "url": "https://www.w3schools.com/",
      "title": "w3schools",
    },
    {
      "id": 2,
      "url": "Foninho",
      "title": "Foninho que comprei nas americanas",
    },
  ]
}

*/

const initalState = {
  links: [],
}

const IndexPage = () => {
  const [store, setStore] = useState(
    JSON.parse(localStorage.store) || initalState
  )
  const [inputTitle, setInputTitle] = useState("")
  const [inputUrl, setInputUrl] = useState("")

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store))
    console.log("localStorage.store", JSON.parse(localStorage.store))
  }, [store])

  const addLink = e => {
    e.preventDefault()

    setStore({
      ...store,
      links: [
        ...store.links,
        {
          id: store.links.length,
          url: inputUrl,
          title: inputTitle,
        },
      ],
    })

    setInputTitle("")
    setInputUrl("")
  }

  const removeLink = id => {
    console.log("id", id)
    const newLinks = store.links.filter(item => item.id !== id)
    console.log("newLinks", newLinks)
    setStore({
      ...store,
      links: [...newLinks],
    })
  }

  return (
    <Layout>
      <Seo title="Home" />
      <h1>Encrypted BookMarks</h1>

      <form onSubmit={e => addLink(e)}>
        <input
          name="url"
          placeholder="Url"
          onChange={e => setInputUrl(e.target.value)}
          value={inputUrl}
        />
        <input
          name="title"
          placeholder="Title"
          onChange={e => setInputTitle(e.target.value)}
          value={inputTitle}
        />
        <button type="submit">Add link</button>
      </form>

      <ul>
        {store.links.map(({ id, url, title }) => (
          <li key={id} className="flex justify-between">
            <a target="_blank" href={url}>
              <img src="" />
              <span>{title}</span>
            </a>
            <span onClick={() => removeLink(id)}>remove item</span>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const axios = require("axios")

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions

  try {
    const response = await axios.get(
      "https://my-json-server.typicode.com/simonkataev/posts1214/posts"
    )
    const posts = response.data

    posts.forEach(post => {
      createNode({
        ...post,
        id: `${post.id}`,
        parent: null,
        children: [],
        internal: {
          type: "Post",
          contentDigest: createContentDigest(post),
        },
      })
    })
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

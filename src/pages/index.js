/** src/pages/index.js **/

import React, { useState } from "react"
import { graphql } from "gatsby"

// CSS-in-JS styles
const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    margin: "0 auto",
    maxWidth: "800px",
    padding: "20px",
    lineHeight: "1.6",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#333",
  },
  select: {
    display: "block",
    margin: "20px auto",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  postList: {
    listStyle: "none",
    padding: 0,
  },
  postItem: {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    transition: "box-shadow 0.3s ease",
  },
  postItemHover: {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  postTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#007acc",
  },
  postBody: {
    color: "#555",
  },
}

const BlogList = ({ data }) => {
  const [filterCategory, setFilterCategory] = useState("")
  const [hoveredPostId, setHoveredPostId] = useState(null)

  const posts = data.allPost.nodes

  const filteredPosts = posts.filter(post => {
    const matchesCategory = !filterCategory || post.category === filterCategory
    return matchesCategory
  })

  const categories = Array.from(
    new Set(posts.map(post => post.category))
  ).sort()

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Blog List</h1>
      <div style={styles.filterContainer}>
        <select
          id="categoryFilter"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={styles.select}
        >
          <option value="">All</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul style={styles.postList}>
        {filteredPosts.map(post => (
          <li
            key={post.id}
            style={{
              ...styles.postItem,
              ...(hoveredPostId === post.id ? styles.postItemHover : {}),
            }}
            onMouseEnter={() => setHoveredPostId(post.id)}
            onMouseLeave={() => setHoveredPostId(null)}
          >
            <h2 style={styles.postTitle}>{post.title}</h2>
            <p style={styles.postBody}>{post.body}</p>
            <p>
              <strong>Category:</strong> {post.category}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const query = graphql`
  query {
    allPost {
      nodes {
        id
        userId
        title
        body
        category
      }
    }
  }
`

export default BlogList

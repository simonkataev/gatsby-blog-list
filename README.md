# Blog List with Filtering

## **Overview**

This project is a statically generated blog list website built using **Gatsby**. It fetches blog post data from an API during the build process and allows users to filter the posts by **Category** dynamically on the client side.

## **Features**

- **Static Site Generation (SSG):**
  - All pages are statically generated at build time for fast performance and SEO benefits.
  - Blog posts are fetched from an external API and integrated into the Gatsby build process.
- **Client-Side Filtering:**
  - Users can filter blog posts dynamically by:
    - **Category** (assigned to each post).
  - React's state management (`useState`) is used for filtering.

---

## **Implementation Details**

### **1. Static Site Generation**

- **Data Fetching:**
  - A custom **Gatsby source plugin** fetches the blog posts from an external API during the build process.
  - This data is transformed into Gatsby nodes, making it queryable with GraphQL.
- **Static Build:**
  - Each page is pre-rendered into an HTML file at build time and stored in the `public` folder for optimal performance.

**Key Files:**

- `gatsby-node.js` (custom plugin):
  - Fetches data from the API and creates `Post` nodes.
- `gatsby-config.js`:
  - Integrates the custom plugin into the Gatsby build pipeline.

### **2. Filtering Functionality**

- **Dynamic Filters:**
  - dropdown filter is provided to allow users to filter posts:
    - **By Category:** Options are dynamically generated based on the `category` field in the dataset.
  - Filtering is implemented client-side for seamless interactivity without reloading the page.
- **Responsive UI:**
  - A clean, user-friendly layout is styled using CSS-in-JS.

**Key File:**

- `src/pages/index.js`:
  - Implements filtering functionality and renders the blog posts list.

---

## **How It Works**

### **At Build Time**

- Gatsby fetches the blog post data using a custom plugin.
- The data is transformed into `Post` nodes and made accessible via GraphQL queries.
- Static HTML pages are generated for the blog list and stored in the `public` directory.

### **At Runtime**

- Users interact with dropdown filters to dynamically filter the posts.
- Filtering is handled entirely on the client side using JavaScript, ensuring fast and smooth updates to the UI.

---

## **Getting Started**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blog-list
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   gatsby develop
   ```
4. Build the site:
   ```bash
   gatsby build
   ```
5. Serve the static site:
   ```bash
   gatsby serve
   ```

## **Filtering Logic**

The filtering logic is implemented in the `src/pages/index.js` file and is based on React's state management. The logic dynamically filters blog posts by **Category** using dropdown menus.

---

## **Steps for Filtering Logic**

### 1. **State Management**

- Two React `useState` hooks are used to store the current filter selections:
  - `filterCategory`: Tracks the selected Category.

```javascript
const [filterCategory, setFilterCategory] = useState("")
```

### 2. **Filtering Conditions**

- Posts are filtered based on the selected Category.
- If neither filter is selected, all posts are displayed.
- A post matches the filter if:
  - It matches the selected Category or no Category is selected (filterCategory === "").

### 3. **Dropdown Options**

- Dropdown options for filtering are dynamically generated:
  - Category options are created from unique category values in the posts.
- `new Set` is used to ensure uniqueness.

```javascript
const categories = Array.from(new Set(posts.map(post => post.category)))
```

### 4. **Event Handlers**

When a dropdown value changes, the corresponding state (filterCategory) is updated.

```javascript
<select
  value={filterCategory}
  onChange={e => setFilterCategory(e.target.value)}
>
  <option value="">All</option>
  {categories.map(category => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>
```

### 5. **Dynamic Rendering**

The filtered posts are displayed by mapping over filteredPosts.

```javascript
<ul>
  {filteredPosts.map(post => (
    <li key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>
        <strong>Category:</strong> {post.category}
      </p>
    </li>
  ))}
</ul>
```

## **Summary**

1. Posts are filtered dynamically on the client side using React state.
2. Filtering supports two criteria:
   - Category: Filter by topic.
3. Dropdown options are generated dynamically from the posts dataset.
4. The filtering logic is lightweight, efficient, and interactive.

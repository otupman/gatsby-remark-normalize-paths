const normalizePaths = require("./index")
const utils = require("./utils")

jest.mock("./utils.js")

const makeAst = (url) => ({
  type: "root",
  children: [{type: "image", url: url}],
})

let mockCwd = null
const repoDir = "/Users/the.user/dir/repo-path"

describe("normalize-paths", () => {
  beforeEach(() => {
    mockCwd = jest.spyOn(process, "cwd").mockImplementation(() => repoDir)
  })
  afterEach(() => {
    mockCwd.mockRestore()
  })

  describe("a file is missing", () => {
    pending("reports an error", () => {})
  })

  describe("when pluginOptions does include a prefix", () => {
    const pluginOptions = {prefix: "/content"}
    it("should convert any string starting with '/' into a relative path", () => {
      const getNode = (mdNode) => ({
        absolutePath: "/content/path/to/something.jpg",
      })
      // utils.getRelativePath.mockImplementation(() => "./path/to/something.jpg")

      const fakeAst = makeAst("/path/to/something")

      normalizePaths(
        {getNode, markdownAST: fakeAst, markdownNode: {parent: "nope"}},
        pluginOptions
      )

      expect(fakeAst.children[0].url).toEqual("./content/path/to/something.jpg")
    })
  })

  describe("when pluginOptions does not include a prefix", () => {
    it("should convert any string starting with '/' into a relative path", () => {
      const getNode = (mdNode) => ({absolutePath: "/content/something.jpg"})
      // utils.getRelativePath.mockImplementation(() => "./something.jpg")

      const fakeAst = makeAst("/something")

      normalizePaths({
        getNode,
        markdownAST: fakeAst,
        markdownNode: {parent: "nope"},
      })

      expect(fakeAst.children[0].url).toEqual("./something.jpg")
    })
  })
})

const utils = require("./utils")
const {join} = require("path")

const repoDir = "/Users/the.user/dir/repo-path"
const fileAbsPath = join(repoDir, "/content/blog/my-second-post/index.md")
const path = "/images/bear.jpg"

describe("utils", () => {
  describe("#getRelativeFilePath", () => {
    let mockCwd
    beforeEach(() => {
      mockCwd = jest.spyOn(process, "cwd").mockImplementation(() => repoDir)
    })
    afterEach(() => {
      mockCwd.mockRestore()
    })

    describe("with ? ? and ?", () => {
      it("returns the relative file path", () => {
        expect(utils.getRelativePath(fileAbsPath, path, undefined)).toEqual(
          "../../../images/bear.jpg"
        )
      })
    })
  })
})

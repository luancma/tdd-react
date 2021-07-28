import { canLoadMore } from "./utils/functions"

describe("testing laod more function", () => {
    it("should return true when orignal is bigger than current", () => {
        const result = canLoadMore(10, 0);
        expect(result).toBe(true)
    })
})
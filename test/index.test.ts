
import "../src/ntst"

const { iff, st, } = ntst

test("iff", () => {
	let sd = iff(true)(a => {
		return "a"
	}).elif(false)(a => {
		return "b"
	}).nor(a => {
		return "c"
	}).end

	expect(sd).toBe("a")
})

test("elif", () => {
	let sd = iff(false)(a => {
		return "a"
	}).elif(true)(a => {
		return "b"
	}).nor(a => {
		return "c"
	}).end

	expect(sd).toBe("b")
})

test("nor", () => {
	let sd = iff(false)(a => {
		return "a"
	}).elif(false)(a => {
		return "b"
	}).nor(a => {
		return "c"
	}).end

	expect(sd).toBe("c")
})

test("st", () => {
	let sd = st(a => "d")

	expect(sd).toBe("d")
})

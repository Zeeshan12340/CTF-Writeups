"use strict";
(self.webpackChunkjwt = self.webpackChunkjwt || []).push([
	[179], {
		498: () => {
			function ne(t) {
				return "function" == typeof t
			}

			function ks(t) {
				const e = t(r => {
					Error.call(r), r.stack = (new Error).stack
				});
				return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e
			}
			const pa = ks(t => function(e) {
				t(this), this.message = e ? `${e.length} errors occurred during unsubscription:\n${e.map((r,i)=>`${i+1}) ${r.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = e
			});

			function xi(t, n) {
				if (t) {
					const e = t.indexOf(n);
					0 <= e && t.splice(e, 1)
				}
			}
			class Et {
				constructor(n) {
					this.initialTeardown = n, this.closed = !1, this._parentage = null, this._finalizers = null
				}
				unsubscribe() {
					let n;
					if (!this.closed) {
						this.closed = !0;
						const {
							_parentage: e
						} = this;
						if (e)
							if (this._parentage = null, Array.isArray(e))
								for (const s of e) s.remove(this);
							else e.remove(this);
						const {
							initialTeardown: r
						} = this;
						if (ne(r)) try {
							r()
						} catch (s) {
							n = s instanceof pa ? s.errors : [s]
						}
						const {
							_finalizers: i
						} = this;
						if (i) {
							this._finalizers = null;
							for (const s of i) try {
								xg(s)
							} catch (o) {
								n = n ?? [], o instanceof pa ? n = [...n, ...o.errors] : n.push(o)
							}
						}
						if (n) throw new pa(n)
					}
				}
				add(n) {
					var e;
					if (n && n !== this)
						if (this.closed) xg(n);
						else {
							if (n instanceof Et) {
								if (n.closed || n._hasParent(this)) return;
								n._addParent(this)
							}(this._finalizers = null !== (e = this._finalizers) && void 0 !== e ? e : []).push(n)
						}
				}
				_hasParent(n) {
					const {
						_parentage: e
					} = this;
					return e === n || Array.isArray(e) && e.includes(n)
				}
				_addParent(n) {
					const {
						_parentage: e
					} = this;
					this._parentage = Array.isArray(e) ? (e.push(n), e) : e ? [e, n] : n
				}
				_removeParent(n) {
					const {
						_parentage: e
					} = this;
					e === n ? this._parentage = null : Array.isArray(e) && xi(e, n)
				}
				remove(n) {
					const {
						_finalizers: e
					} = this;
					e && xi(e, n), n instanceof Et && n._removeParent(this)
				}
			}
			Et.EMPTY = (() => {
				const t = new Et;
				return t.closed = !0, t
			})();
			const Cg = Et.EMPTY;

			function Dg(t) {
				return t instanceof Et || t && "closed" in t && ne(t.remove) && ne(t.add) && ne(t.unsubscribe)
			}

			function xg(t) {
				ne(t) ? t() : t.unsubscribe()
			}
			const Ur = {
					onUnhandledError: null,
					onStoppedNotification: null,
					Promise: void 0,
					useDeprecatedSynchronousErrorHandling: !1,
					useDeprecatedNextContext: !1
				},
				ga = {
					setTimeout(t, n, ...e) {
						const {
							delegate: r
						} = ga;
						return r?.setTimeout ? r.setTimeout(t, n, ...e) : setTimeout(t, n, ...e)
					},
					clearTimeout(t) {
						const {
							delegate: n
						} = ga;
						return (n?.clearTimeout || clearTimeout)(t)
					},
					delegate: void 0
				};

			function Eg(t) {
				ga.setTimeout(() => {
					const {
						onUnhandledError: n
					} = Ur;
					if (!n) throw t;
					n(t)
				})
			}

			function sc() {}
			const hA = oc("C", void 0, void 0);

			function oc(t, n, e) {
				return {
					kind: t,
					value: n,
					error: e
				}
			}
			let Gr = null;

			function ma(t) {
				if (Ur.useDeprecatedSynchronousErrorHandling) {
					const n = !Gr;
					if (n && (Gr = {
							errorThrown: !1,
							error: null
						}), t(), n) {
						const {
							errorThrown: e,
							error: r
						} = Gr;
						if (Gr = null, e) throw r
					}
				} else t()
			}
			class ac extends Et {
				constructor(n) {
					super(), this.isStopped = !1, n ? (this.destination = n, Dg(n) && n.add(this)) : this.destination = bA
				}
				static create(n, e, r) {
					return new Ns(n, e, r)
				}
				next(n) {
					this.isStopped ? uc(function gA(t) {
						return oc("N", t, void 0)
					}(n), this) : this._next(n)
				}
				error(n) {
					this.isStopped ? uc(function pA(t) {
						return oc("E", void 0, t)
					}(n), this) : (this.isStopped = !0, this._error(n))
				}
				complete() {
					this.isStopped ? uc(hA, this) : (this.isStopped = !0, this._complete())
				}
				unsubscribe() {
					this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
				}
				_next(n) {
					this.destination.next(n)
				}
				_error(n) {
					try {
						this.destination.error(n)
					} finally {
						this.unsubscribe()
					}
				}
				_complete() {
					try {
						this.destination.complete()
					} finally {
						this.unsubscribe()
					}
				}
			}
			const yA = Function.prototype.bind;

			function lc(t, n) {
				return yA.call(t, n)
			}
			class _A {
				constructor(n) {
					this.partialObserver = n
				}
				next(n) {
					const {
						partialObserver: e
					} = this;
					if (e.next) try {
						e.next(n)
					} catch (r) {
						ya(r)
					}
				}
				error(n) {
					const {
						partialObserver: e
					} = this;
					if (e.error) try {
						e.error(n)
					} catch (r) {
						ya(r)
					} else ya(n)
				}
				complete() {
					const {
						partialObserver: n
					} = this;
					if (n.complete) try {
						n.complete()
					} catch (e) {
						ya(e)
					}
				}
			}
			class Ns extends ac {
				constructor(n, e, r) {
					let i;
					if (super(), ne(n) || !n) i = {
						next: n ?? void 0,
						error: e ?? void 0,
						complete: r ?? void 0
					};
					else {
						let s;
						this && Ur.useDeprecatedNextContext ? (s = Object.create(n), s.unsubscribe = () => this.unsubscribe(), i = {
							next: n.next && lc(n.next, s),
							error: n.error && lc(n.error, s),
							complete: n.complete && lc(n.complete, s)
						}) : i = n
					}
					this.destination = new _A(i)
				}
			}

			function ya(t) {
				Ur.useDeprecatedSynchronousErrorHandling ? function mA(t) {
					Ur.useDeprecatedSynchronousErrorHandling && Gr && (Gr.errorThrown = !0, Gr.error = t)
				}(t) : Eg(t)
			}

			function uc(t, n) {
				const {
					onStoppedNotification: e
				} = Ur;
				e && ga.setTimeout(() => e(t, n))
			}
			const bA = {
					closed: !0,
					next: sc,
					error: function vA(t) {
						throw t
					},
					complete: sc
				},
				cc = "function" == typeof Symbol && Symbol.observable || "@@observable";

			function br(t) {
				return t
			}

			function Mg(t) {
				return 0 === t.length ? br : 1 === t.length ? t[0] : function(e) {
					return t.reduce((r, i) => i(r), e)
				}
			}
			let Ce = (() => {
				class t {
					constructor(e) {
						e && (this._subscribe = e)
					}
					lift(e) {
						const r = new t;
						return r.source = this, r.operator = e, r
					}
					subscribe(e, r, i) {
						const s = function DA(t) {
							return t && t instanceof ac || function CA(t) {
								return t && ne(t.next) && ne(t.error) && ne(t.complete)
							}(t) && Dg(t)
						}(e) ? e : new Ns(e, r, i);
						return ma(() => {
							const {
								operator: o,
								source: a
							} = this;
							s.add(o ? o.call(s, a) : a ? this._subscribe(s) : this._trySubscribe(s))
						}), s
					}
					_trySubscribe(e) {
						try {
							return this._subscribe(e)
						} catch (r) {
							e.error(r)
						}
					}
					forEach(e, r) {
						return new(r = Ag(r))((i, s) => {
							const o = new Ns({
								next: a => {
									try {
										e(a)
									} catch (l) {
										s(l), o.unsubscribe()
									}
								},
								error: s,
								complete: i
							});
							this.subscribe(o)
						})
					}
					_subscribe(e) {
						var r;
						return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(e)
					} [cc]() {
						return this
					}
					pipe(...e) {
						return Mg(e)(this)
					}
					toPromise(e) {
						return new(e = Ag(e))((r, i) => {
							let s;
							this.subscribe(o => s = o, o => i(o), () => r(s))
						})
					}
				}
				return t.create = n => new t(n), t
			})();

			function Ag(t) {
				var n;
				return null !== (n = t ?? Ur.Promise) && void 0 !== n ? n : Promise
			}
			const xA = ks(t => function() {
				t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
			});
			let Re = (() => {
				class t extends Ce {
					constructor() {
						super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
					}
					lift(e) {
						const r = new Sg(this, this);
						return r.operator = e, r
					}
					_throwIfClosed() {
						if (this.closed) throw new xA
					}
					next(e) {
						ma(() => {
							if (this._throwIfClosed(), !this.isStopped) {
								this.currentObservers || (this.currentObservers = Array.from(this.observers));
								for (const r of this.currentObservers) r.next(e)
							}
						})
					}
					error(e) {
						ma(() => {
							if (this._throwIfClosed(), !this.isStopped) {
								this.hasError = this.isStopped = !0, this.thrownError = e;
								const {
									observers: r
								} = this;
								for (; r.length;) r.shift().error(e)
							}
						})
					}
					complete() {
						ma(() => {
							if (this._throwIfClosed(), !this.isStopped) {
								this.isStopped = !0;
								const {
									observers: e
								} = this;
								for (; e.length;) e.shift().complete()
							}
						})
					}
					unsubscribe() {
						this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
					}
					get observed() {
						var e;
						return (null === (e = this.observers) || void 0 === e ? void 0 : e.length) > 0
					}
					_trySubscribe(e) {
						return this._throwIfClosed(), super._trySubscribe(e)
					}
					_subscribe(e) {
						return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e)
					}
					_innerSubscribe(e) {
						const {
							hasError: r,
							isStopped: i,
							observers: s
						} = this;
						return r || i ? Cg : (this.currentObservers = null, s.push(e), new Et(() => {
							this.currentObservers = null, xi(s, e)
						}))
					}
					_checkFinalizedStatuses(e) {
						const {
							hasError: r,
							thrownError: i,
							isStopped: s
						} = this;
						r ? e.error(i) : s && e.complete()
					}
					asObservable() {
						const e = new Ce;
						return e.source = this, e
					}
				}
				return t.create = (n, e) => new Sg(n, e), t
			})();
			class Sg extends Re {
				constructor(n, e) {
					super(), this.destination = n, this.source = e
				}
				next(n) {
					var e, r;
					null === (r = null === (e = this.destination) || void 0 === e ? void 0 : e.next) || void 0 === r || r.call(e, n)
				}
				error(n) {
					var e, r;
					null === (r = null === (e = this.destination) || void 0 === e ? void 0 : e.error) || void 0 === r || r.call(e, n)
				}
				complete() {
					var n, e;
					null === (e = null === (n = this.destination) || void 0 === n ? void 0 : n.complete) || void 0 === e || e.call(n)
				}
				_subscribe(n) {
					var e, r;
					return null !== (r = null === (e = this.source) || void 0 === e ? void 0 : e.subscribe(n)) && void 0 !== r ? r : Cg
				}
			}

			function Ig(t) {
				return ne(t?.lift)
			}

			function Ve(t) {
				return n => {
					if (Ig(n)) return n.lift(function(e) {
						try {
							return t(e, this)
						} catch (r) {
							this.error(r)
						}
					});
					throw new TypeError("Unable to lift unknown Observable type")
				}
			}

			function Oe(t, n, e, r, i) {
				return new EA(t, n, e, r, i)
			}
			class EA extends ac {
				constructor(n, e, r, i, s, o) {
					super(n), this.onFinalize = s, this.shouldUnsubscribe = o, this._next = e ? function(a) {
						try {
							e(a)
						} catch (l) {
							n.error(l)
						}
					} : super._next, this._error = i ? function(a) {
						try {
							i(a)
						} catch (l) {
							n.error(l)
						} finally {
							this.unsubscribe()
						}
					} : super._error, this._complete = r ? function() {
						try {
							r()
						} catch (a) {
							n.error(a)
						} finally {
							this.unsubscribe()
						}
					} : super._complete
				}
				unsubscribe() {
					var n;
					if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
						const {
							closed: e
						} = this;
						super.unsubscribe(), !e && (null === (n = this.onFinalize) || void 0 === n || n.call(this))
					}
				}
			}

			function j(t, n) {
				return Ve((e, r) => {
					let i = 0;
					e.subscribe(Oe(r, s => {
						r.next(t.call(n, s, i++))
					}))
				})
			}

			function zr(t) {
				return this instanceof zr ? (this.v = t, this) : new zr(t)
			}

			function SA(t, n, e) {
				if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
				var i, r = e.apply(t, n || []),
					s = [];
				return i = {}, o("next"), o("throw"), o("return"), i[Symbol.asyncIterator] = function() {
					return this
				}, i;

				function o(f) {
					r[f] && (i[f] = function(h) {
						return new Promise(function(g, m) {
							s.push([f, h, g, m]) > 1 || a(f, h)
						})
					})
				}

				function a(f, h) {
					try {
						! function l(f) {
							f.value instanceof zr ? Promise.resolve(f.value.v).then(u, c) : d(s[0][2], f)
						}(r[f](h))
					} catch (g) {
						d(s[0][3], g)
					}
				}

				function u(f) {
					a("next", f)
				}

				function c(f) {
					a("throw", f)
				}

				function d(f, h) {
					f(h), s.shift(), s.length && a(s[0][0], s[0][1])
				}
			}

			function IA(t) {
				if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
				var e, n = t[Symbol.asyncIterator];
				return n ? n.call(t) : (t = function Rg(t) {
					var n = "function" == typeof Symbol && Symbol.iterator,
						e = n && t[n],
						r = 0;
					if (e) return e.call(t);
					if (t && "number" == typeof t.length) return {
						next: function() {
							return t && r >= t.length && (t = void 0), {
								value: t && t[r++],
								done: !t
							}
						}
					};
					throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.")
				}(t), e = {}, r("next"), r("throw"), r("return"), e[Symbol.asyncIterator] = function() {
					return this
				}, e);

				function r(s) {
					e[s] = t[s] && function(o) {
						return new Promise(function(a, l) {
							! function i(s, o, a, l) {
								Promise.resolve(l).then(function(u) {
									s({
										value: u,
										done: a
									})
								}, o)
							}(a, l, (o = t[s](o)).done, o.value)
						})
					}
				}
			}
			const fc = t => t && "number" == typeof t.length && "function" != typeof t;

			function Og(t) {
				return ne(t?.then)
			}

			function kg(t) {
				return ne(t[cc])
			}

			function Ng(t) {
				return Symbol.asyncIterator && ne(t?.[Symbol.asyncIterator])
			}

			function Lg(t) {
				return new TypeError(`You provided ${null!==t&&"object"==typeof t?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
			}
			const Pg = function FA() {
				return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
			}();

			function Vg(t) {
				return ne(t?.[Pg])
			}

			function Bg(t) {
				return SA(this, arguments, function*() {
					const e = t.getReader();
					try {
						for (;;) {
							const {
								value: r,
								done: i
							} = yield zr(e.read());
							if (i) return yield zr(void 0);
							yield yield zr(r)
						}
					} finally {
						e.releaseLock()
					}
				})
			}

			function Hg(t) {
				return ne(t?.getReader)
			}

			function Ot(t) {
				if (t instanceof Ce) return t;
				if (null != t) {
					if (kg(t)) return function RA(t) {
						return new Ce(n => {
							const e = t[cc]();
							if (ne(e.subscribe)) return e.subscribe(n);
							throw new TypeError("Provided object does not correctly implement Symbol.observable")
						})
					}(t);
					if (fc(t)) return function OA(t) {
						return new Ce(n => {
							for (let e = 0; e < t.length && !n.closed; e++) n.next(t[e]);
							n.complete()
						})
					}(t);
					if (Og(t)) return function kA(t) {
						return new Ce(n => {
							t.then(e => {
								n.closed || (n.next(e), n.complete())
							}, e => n.error(e)).then(null, Eg)
						})
					}(t);
					if (Ng(t)) return jg(t);
					if (Vg(t)) return function NA(t) {
						return new Ce(n => {
							for (const e of t)
								if (n.next(e), n.closed) return;
							n.complete()
						})
					}(t);
					if (Hg(t)) return function LA(t) {
						return jg(Bg(t))
					}(t)
				}
				throw Lg(t)
			}

			function jg(t) {
				return new Ce(n => {
					(function PA(t, n) {
						var e, r, i, s;
						return function MA(t, n, e, r) {
							return new(e || (e = Promise))(function(s, o) {
								function a(c) {
									try {
										u(r.next(c))
									} catch (d) {
										o(d)
									}
								}

								function l(c) {
									try {
										u(r.throw(c))
									} catch (d) {
										o(d)
									}
								}

								function u(c) {
									c.done ? s(c.value) : function i(s) {
										return s instanceof e ? s : new e(function(o) {
											o(s)
										})
									}(c.value).then(a, l)
								}
								u((r = r.apply(t, n || [])).next())
							})
						}(this, void 0, void 0, function*() {
							try {
								for (e = IA(t); !(r = yield e.next()).done;)
									if (n.next(r.value), n.closed) return
							} catch (o) {
								i = {
									error: o
								}
							} finally {
								try {
									r && !r.done && (s = e.return) && (yield s.call(e))
								} finally {
									if (i) throw i.error
								}
							}
							n.complete()
						})
					})(t, n).catch(e => n.error(e))
				})
			}

			function qn(t, n, e, r = 0, i = !1) {
				const s = n.schedule(function() {
					e(), i ? t.add(this.schedule(null, r)) : this.unsubscribe()
				}, r);
				if (t.add(s), !i) return s
			}

			function nt(t, n, e = 1 / 0) {
				return ne(n) ? nt((r, i) => j((s, o) => n(r, s, i, o))(Ot(t(r, i))), e) : ("number" == typeof n && (e = n), Ve((r, i) => function VA(t, n, e, r, i, s, o, a) {
					const l = [];
					let u = 0,
						c = 0,
						d = !1;
					const f = () => {
							d && !l.length && !u && n.complete()
						},
						h = m => u < r ? g(m) : l.push(m),
						g = m => {
							s && n.next(m), u++;
							let _ = !1;
							Ot(e(m, c++)).subscribe(Oe(n, y => {
								i?.(y), s ? h(y) : n.next(y)
							}, () => {
								_ = !0
							}, void 0, () => {
								if (_) try {
									for (u--; l.length && u < r;) {
										const y = l.shift();
										o ? qn(n, o, () => g(y)) : g(y)
									}
									f()
								} catch (y) {
									n.error(y)
								}
							}))
						};
					return t.subscribe(Oe(n, h, () => {
						d = !0, f()
					})), () => {
						a?.()
					}
				}(r, i, t, e)))
			}

			function Ei(t = 1 / 0) {
				return nt(br, t)
			}
			const Fn = new Ce(t => t.complete());

			function hc(t) {
				return t[t.length - 1]
			}

			function $g(t) {
				return ne(hc(t)) ? t.pop() : void 0
			}

			function Ls(t) {
				return function HA(t) {
					return t && ne(t.schedule)
				}(hc(t)) ? t.pop() : void 0
			}

			function Ug(t, n = 0) {
				return Ve((e, r) => {
					e.subscribe(Oe(r, i => qn(r, t, () => r.next(i), n), () => qn(r, t, () => r.complete(), n), i => qn(r, t, () => r.error(i), n)))
				})
			}

			function Gg(t, n = 0) {
				return Ve((e, r) => {
					r.add(t.schedule(() => e.subscribe(r), n))
				})
			}

			function zg(t, n) {
				if (!t) throw new Error("Iterable cannot be null");
				return new Ce(e => {
					qn(e, n, () => {
						const r = t[Symbol.asyncIterator]();
						qn(e, n, () => {
							r.next().then(i => {
								i.done ? e.complete() : e.next(i.value)
							})
						}, 0, !0)
					})
				})
			}

			function $e(t, n) {
				return n ? function qA(t, n) {
					if (null != t) {
						if (kg(t)) return function $A(t, n) {
							return Ot(t).pipe(Gg(n), Ug(n))
						}(t, n);
						if (fc(t)) return function GA(t, n) {
							return new Ce(e => {
								let r = 0;
								return n.schedule(function() {
									r === t.length ? e.complete() : (e.next(t[r++]), e.closed || this.schedule())
								})
							})
						}(t, n);
						if (Og(t)) return function UA(t, n) {
							return Ot(t).pipe(Gg(n), Ug(n))
						}(t, n);
						if (Ng(t)) return zg(t, n);
						if (Vg(t)) return function zA(t, n) {
							return new Ce(e => {
								let r;
								return qn(e, n, () => {
									r = t[Pg](), qn(e, n, () => {
										let i, s;
										try {
											({
												value: i,
												done: s
											} = r.next())
										} catch (o) {
											return void e.error(o)
										}
										s ? e.complete() : e.next(i)
									}, 0, !0)
								}), () => ne(r?.return) && r.return()
							})
						}(t, n);
						if (Hg(t)) return function WA(t, n) {
							return zg(Bg(t), n)
						}(t, n)
					}
					throw Lg(t)
				}(t, n) : Ot(t)
			}

			function _a(...t) {
				const n = Ls(t),
					e = function jA(t, n) {
						return "number" == typeof hc(t) ? t.pop() : n
					}(t, 1 / 0),
					r = t;
				return r.length ? 1 === r.length ? Ot(r[0]) : Ei(e)($e(r, n)) : Fn
			}

			function Wg(t = {}) {
				const {
					connector: n = (() => new Re),
					resetOnError: e = !0,
					resetOnComplete: r = !0,
					resetOnRefCountZero: i = !0
				} = t;
				return s => {
					let o, a, l, u = 0,
						c = !1,
						d = !1;
					const f = () => {
							a?.unsubscribe(), a = void 0
						},
						h = () => {
							f(), o = l = void 0, c = d = !1
						},
						g = () => {
							const m = o;
							h(), m?.unsubscribe()
						};
					return Ve((m, _) => {
						u++, !d && !c && f();
						const y = l = l ?? n();
						_.add(() => {
							u--, 0 === u && !d && !c && (a = pc(g, i))
						}), y.subscribe(_), !o && u > 0 && (o = new Ns({
							next: C => y.next(C),
							error: C => {
								d = !0, f(), a = pc(h, e, C), y.error(C)
							},
							complete: () => {
								c = !0, f(), a = pc(h, r), y.complete()
							}
						}), Ot(m).subscribe(o))
					})(s)
				}
			}

			function pc(t, n, ...e) {
				if (!0 === n) return void t();
				if (!1 === n) return;
				const r = new Ns({
					next: () => {
						r.unsubscribe(), t()
					}
				});
				return n(...e).subscribe(r)
			}

			function he(t) {
				for (let n in t)
					if (t[n] === he) return n;
				throw Error("Could not find renamed property on target object.")
			}

			function gc(t, n) {
				for (const e in n) n.hasOwnProperty(e) && !t.hasOwnProperty(e) && (t[e] = n[e])
			}

			function pe(t) {
				if ("string" == typeof t) return t;
				if (Array.isArray(t)) return "[" + t.map(pe).join(", ") + "]";
				if (null == t) return "" + t;
				if (t.overriddenName) return `${t.overriddenName}`;
				if (t.name) return `${t.name}`;
				const n = t.toString();
				if (null == n) return "" + n;
				const e = n.indexOf("\n");
				return -1 === e ? n : n.substring(0, e)
			}

			function mc(t, n) {
				return null == t || "" === t ? null === n ? "" : n : null == n || "" === n ? t : t + " " + n
			}
			const KA = he({
				__forward_ref__: he
			});

			function ye(t) {
				return t.__forward_ref__ = ye, t.toString = function() {
					return pe(this())
				}, t
			}

			function H(t) {
				return yc(t) ? t() : t
			}

			function yc(t) {
				return "function" == typeof t && t.hasOwnProperty(KA) && t.__forward_ref__ === ye
			}
			class w extends Error {
				constructor(n, e) {
					super(function va(t, n) {
						return `NG0${Math.abs(t)}${n?": "+n.trim():""}`
					}(n, e)), this.code = n
				}
			}

			function G(t) {
				return "string" == typeof t ? t : null == t ? "" : String(t)
			}

			function ba(t, n) {
				throw new w(-201, !1)
			}

			function Nt(t, n) {
				null == t && function ue(t, n, e, r) {
					throw new Error(`ASSERTION ERROR: ${t}` + (null == r ? "" : ` [Expected=> ${e} ${r} ${n} <=Actual]`))
				}(n, t, null, "!=")
			}

			function E(t) {
				return {
					token: t.token,
					providedIn: t.providedIn || null,
					factory: t.factory,
					value: void 0
				}
			}

			function ce(t) {
				return {
					providers: t.providers || [],
					imports: t.imports || []
				}
			}

			function wa(t) {
				return qg(t, Ca) || qg(t, Qg)
			}

			function qg(t, n) {
				return t.hasOwnProperty(n) ? t[n] : null
			}

			function Kg(t) {
				return t && (t.hasOwnProperty(_c) || t.hasOwnProperty(r0)) ? t[_c] : null
			}
			const Ca = he({
					\u0275prov: he
				}),
				_c = he({
					\u0275inj: he
				}),
				Qg = he({
					ngInjectableDef: he
				}),
				r0 = he({
					ngInjectorDef: he
				});
			var P = (() => ((P = P || {})[P.Default = 0] = "Default", P[P.Host = 1] = "Host", P[P.Self = 2] = "Self", P[P.SkipSelf = 4] = "SkipSelf", P[P.Optional = 8] = "Optional", P))();
			let vc;

			function Jt(t) {
				const n = vc;
				return vc = t, n
			}

			function Yg(t, n, e) {
				const r = wa(t);
				return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : e & P.Optional ? null : void 0 !== n ? n : void ba(pe(t))
			}

			function wr(t) {
				return {
					toString: t
				}.toString()
			}
			var pn = (() => ((pn = pn || {})[pn.OnPush = 0] = "OnPush", pn[pn.Default = 1] = "Default", pn))(),
				gn = (() => {
					return (t = gn || (gn = {}))[t.Emulated = 0] = "Emulated", t[t.None = 2] = "None", t[t.ShadowDom = 3] = "ShadowDom", gn;
					var t
				})();
			const _e = (() => typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)(),
				Mi = {},
				le = [],
				Da = he({
					\u0275cmp: he
				}),
				bc = he({
					\u0275dir: he
				}),
				wc = he({
					\u0275pipe: he
				}),
				Zg = he({
					\u0275mod: he
				}),
				Qn = he({
					\u0275fac: he
				}),
				Ps = he({
					__NG_ELEMENT_ID__: he
				});
			let o0 = 0;

			function en(t) {
				return wr(() => {
					const e = !0 === t.standalone,
						r = {},
						i = {
							type: t.type,
							providersResolver: null,
							decls: t.decls,
							vars: t.vars,
							factory: null,
							template: t.template || null,
							consts: t.consts || null,
							ngContentSelectors: t.ngContentSelectors,
							hostBindings: t.hostBindings || null,
							hostVars: t.hostVars || 0,
							hostAttrs: t.hostAttrs || null,
							contentQueries: t.contentQueries || null,
							declaredInputs: r,
							inputs: null,
							outputs: null,
							exportAs: t.exportAs || null,
							onPush: t.changeDetection === pn.OnPush,
							directiveDefs: null,
							pipeDefs: null,
							standalone: e,
							dependencies: e && t.dependencies || null,
							getStandaloneInjector: null,
							selectors: t.selectors || le,
							viewQuery: t.viewQuery || null,
							features: t.features || null,
							data: t.data || {},
							encapsulation: t.encapsulation || gn.Emulated,
							id: "c" + o0++,
							styles: t.styles || le,
							_: null,
							setInput: null,
							schemas: t.schemas || null,
							tView: null
						},
						s = t.dependencies,
						o = t.features;
					return i.inputs = em(t.inputs, r), i.outputs = em(t.outputs), o && o.forEach(a => a(i)), i.directiveDefs = s ? () => ("function" == typeof s ? s() : s).map(Xg).filter(Jg) : null, i.pipeDefs = s ? () => ("function" == typeof s ? s() : s).map(gt).filter(Jg) : null, i
				})
			}

			function Xg(t) {
				return fe(t) || pt(t)
			}

			function Jg(t) {
				return null !== t
			}

			function de(t) {
				return wr(() => ({
					type: t.type,
					bootstrap: t.bootstrap || le,
					declarations: t.declarations || le,
					imports: t.imports || le,
					exports: t.exports || le,
					transitiveCompileScopes: null,
					schemas: t.schemas || null,
					id: t.id || null
				}))
			}

			function em(t, n) {
				if (null == t) return Mi;
				const e = {};
				for (const r in t)
					if (t.hasOwnProperty(r)) {
						let i = t[r],
							s = i;
						Array.isArray(i) && (s = i[1], i = i[0]), e[i] = r, n && (n[i] = s)
					} return e
			}
			const x = en;

			function fe(t) {
				return t[Da] || null
			}

			function pt(t) {
				return t[bc] || null
			}

			function gt(t) {
				return t[wc] || null
			}

			function Lt(t, n) {
				const e = t[Zg] || null;
				if (!e && !0 === n) throw new Error(`Type ${pe(t)} does not have '\u0275mod' property.`);
				return e
			}
			const Q = 11;

			function At(t) {
				return Array.isArray(t) && "object" == typeof t[1]
			}

			function yn(t) {
				return Array.isArray(t) && !0 === t[1]
			}

			function xc(t) {
				return 0 != (8 & t.flags)
			}

			function Aa(t) {
				return 2 == (2 & t.flags)
			}

			function Sa(t) {
				return 1 == (1 & t.flags)
			}

			function _n(t) {
				return null !== t.template
			}

			function f0(t) {
				return 0 != (256 & t[2])
			}

			function Yr(t, n) {
				return t.hasOwnProperty(Qn) ? t[Qn] : null
			}
			class g0 {
				constructor(n, e, r) {
					this.previousValue = n, this.currentValue = e, this.firstChange = r
				}
				isFirstChange() {
					return this.firstChange
				}
			}

			function mt() {
				return rm
			}

			function rm(t) {
				return t.type.prototype.ngOnChanges && (t.setInput = y0), m0
			}

			function m0() {
				const t = sm(this),
					n = t?.current;
				if (n) {
					const e = t.previous;
					if (e === Mi) t.previous = n;
					else
						for (let r in n) e[r] = n[r];
					t.current = null, this.ngOnChanges(n)
				}
			}

			function y0(t, n, e, r) {
				const i = sm(t) || function _0(t, n) {
						return t[im] = n
					}(t, {
						previous: Mi,
						current: null
					}),
					s = i.current || (i.current = {}),
					o = i.previous,
					a = this.declaredInputs[e],
					l = o[a];
				s[a] = new g0(l && l.currentValue, n, o === Mi), t[r] = n
			}
			mt.ngInherit = !0;
			const im = "__ngSimpleChanges__";

			function sm(t) {
				return t[im] || null
			}

			function Ue(t) {
				for (; Array.isArray(t);) t = t[0];
				return t
			}

			function Ia(t, n) {
				return Ue(n[t])
			}

			function rn(t, n) {
				return Ue(n[t.index])
			}

			function Ic(t, n) {
				return t.data[n]
			}

			function Vt(t, n) {
				const e = n[t];
				return At(e) ? e : e[0]
			}

			function Ta(t) {
				return 64 == (64 & t[2])
			}

			function Cr(t, n) {
				return null == n ? null : t[n]
			}

			function om(t) {
				t[18] = 0
			}

			function Tc(t, n) {
				t[5] += n;
				let e = t,
					r = t[3];
				for (; null !== r && (1 === n && 1 === e[5] || -1 === n && 0 === e[5]);) r[5] += n, e = r, r = r[3]
			}
			const $ = {
				lFrame: mm(null),
				bindingsEnabled: !0
			};

			function lm() {
				return $.bindingsEnabled
			}

			function D() {
				return $.lFrame.lView
			}

			function te() {
				return $.lFrame.tView
			}

			function Fc(t) {
				return $.lFrame.contextLView = t, t[8]
			}

			function Rc(t) {
				return $.lFrame.contextLView = null, t
			}

			function Ke() {
				let t = um();
				for (; null !== t && 64 === t.type;) t = t.parent;
				return t
			}

			function um() {
				return $.lFrame.currentTNode
			}

			function Rn(t, n) {
				const e = $.lFrame;
				e.currentTNode = t, e.isParent = n
			}

			function Oc() {
				return $.lFrame.isParent
			}

			function kc() {
				$.lFrame.isParent = !1
			}

			function Ri() {
				return $.lFrame.bindingIndex++
			}

			function O0(t, n) {
				const e = $.lFrame;
				e.bindingIndex = e.bindingRootIndex = t, Nc(n)
			}

			function Nc(t) {
				$.lFrame.currentDirectiveIndex = t
			}

			function hm() {
				return $.lFrame.currentQueryIndex
			}

			function Pc(t) {
				$.lFrame.currentQueryIndex = t
			}

			function N0(t) {
				const n = t[1];
				return 2 === n.type ? n.declTNode : 1 === n.type ? t[6] : null
			}

			function pm(t, n, e) {
				if (e & P.SkipSelf) {
					let i = n,
						s = t;
					for (; !(i = i.parent, null !== i || e & P.Host || (i = N0(s), null === i || (s = s[15], 10 & i.type))););
					if (null === i) return !1;
					n = i, t = s
				}
				const r = $.lFrame = gm();
				return r.currentTNode = n, r.lView = t, !0
			}

			function Vc(t) {
				const n = gm(),
					e = t[1];
				$.lFrame = n, n.currentTNode = e.firstChild, n.lView = t, n.tView = e, n.contextLView = t, n.bindingIndex = e.bindingStartIndex, n.inI18n = !1
			}

			function gm() {
				const t = $.lFrame,
					n = null === t ? null : t.child;
				return null === n ? mm(t) : n
			}

			function mm(t) {
				const n = {
					currentTNode: null,
					isParent: !0,
					lView: null,
					tView: null,
					selectedIndex: -1,
					contextLView: null,
					elementDepthCount: 0,
					currentNamespace: null,
					currentDirectiveIndex: -1,
					bindingRootIndex: -1,
					bindingIndex: -1,
					currentQueryIndex: 0,
					parent: t,
					child: null,
					inI18n: !1
				};
				return null !== t && (t.child = n), n
			}

			function ym() {
				const t = $.lFrame;
				return $.lFrame = t.parent, t.currentTNode = null, t.lView = null, t
			}
			const _m = ym;

			function Bc() {
				const t = ym();
				t.isParent = !0, t.tView = null, t.selectedIndex = -1, t.contextLView = null, t.elementDepthCount = 0, t.currentDirectiveIndex = -1, t.currentNamespace = null, t.bindingRootIndex = -1, t.bindingIndex = -1, t.currentQueryIndex = 0
			}

			function _t() {
				return $.lFrame.selectedIndex
			}

			function Dr(t) {
				$.lFrame.selectedIndex = t
			}

			function Ne() {
				const t = $.lFrame;
				return Ic(t.tView, t.selectedIndex)
			}

			function Fa(t, n) {
				for (let e = n.directiveStart, r = n.directiveEnd; e < r; e++) {
					const s = t.data[e].type.prototype,
						{
							ngAfterContentInit: o,
							ngAfterContentChecked: a,
							ngAfterViewInit: l,
							ngAfterViewChecked: u,
							ngOnDestroy: c
						} = s;
					o && (t.contentHooks || (t.contentHooks = [])).push(-e, o), a && ((t.contentHooks || (t.contentHooks = [])).push(e, a), (t.contentCheckHooks || (t.contentCheckHooks = [])).push(e, a)), l && (t.viewHooks || (t.viewHooks = [])).push(-e, l), u && ((t.viewHooks || (t.viewHooks = [])).push(e, u), (t.viewCheckHooks || (t.viewCheckHooks = [])).push(e, u)), null != c && (t.destroyHooks || (t.destroyHooks = [])).push(e, c)
				}
			}

			function Ra(t, n, e) {
				vm(t, n, 3, e)
			}

			function Oa(t, n, e, r) {
				(3 & t[2]) === e && vm(t, n, e, r)
			}

			function Hc(t, n) {
				let e = t[2];
				(3 & e) === n && (e &= 2047, e += 1, t[2] = e)
			}

			function vm(t, n, e, r) {
				const s = r ?? -1,
					o = n.length - 1;
				let a = 0;
				for (let l = void 0 !== r ? 65535 & t[18] : 0; l < o; l++)
					if ("number" == typeof n[l + 1]) {
						if (a = n[l], null != r && a >= r) break
					} else n[l] < 0 && (t[18] += 65536), (a < s || -1 == s) && (G0(t, e, n, l), t[18] = (4294901760 & t[18]) + l + 2), l++
			}

			function G0(t, n, e, r) {
				const i = e[r] < 0,
					s = e[r + 1],
					a = t[i ? -e[r] : e[r]];
				if (i) {
					if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === n) {
						t[2] += 2048;
						try {
							s.call(a)
						} finally {}
					}
				} else try {
					s.call(a)
				} finally {}
			}
			class Us {
				constructor(n, e, r) {
					this.factory = n, this.resolving = !1, this.canSeeViewProviders = e, this.injectImpl = r
				}
			}

			function ka(t, n, e) {
				let r = 0;
				for (; r < e.length;) {
					const i = e[r];
					if ("number" == typeof i) {
						if (0 !== i) break;
						r++;
						const s = e[r++],
							o = e[r++],
							a = e[r++];
						t.setAttribute(n, o, a, s)
					} else {
						const s = i,
							o = e[++r];
						wm(s) ? t.setProperty(n, s, o) : t.setAttribute(n, s, o), r++
					}
				}
				return r
			}

			function bm(t) {
				return 3 === t || 4 === t || 6 === t
			}

			function wm(t) {
				return 64 === t.charCodeAt(0)
			}

			function Na(t, n) {
				if (null !== n && 0 !== n.length)
					if (null === t || 0 === t.length) t = n.slice();
					else {
						let e = -1;
						for (let r = 0; r < n.length; r++) {
							const i = n[r];
							"number" == typeof i ? e = i : 0 === e || Cm(t, e, i, null, -1 === e || 2 === e ? n[++r] : null)
						}
					} return t
			}

			function Cm(t, n, e, r, i) {
				let s = 0,
					o = t.length;
				if (-1 === n) o = -1;
				else
					for (; s < t.length;) {
						const a = t[s++];
						if ("number" == typeof a) {
							if (a === n) {
								o = -1;
								break
							}
							if (a > n) {
								o = s - 1;
								break
							}
						}
					}
				for (; s < t.length;) {
					const a = t[s];
					if ("number" == typeof a) break;
					if (a === e) {
						if (null === r) return void(null !== i && (t[s + 1] = i));
						if (r === t[s + 1]) return void(t[s + 2] = i)
					}
					s++, null !== r && s++, null !== i && s++
				} - 1 !== o && (t.splice(o, 0, n), s = o + 1), t.splice(s++, 0, e), null !== r && t.splice(s++, 0, r), null !== i && t.splice(s++, 0, i)
			}

			function Dm(t) {
				return -1 !== t
			}

			function Oi(t) {
				return 32767 & t
			}

			function ki(t, n) {
				let e = function Q0(t) {
						return t >> 16
					}(t),
					r = n;
				for (; e > 0;) r = r[15], e--;
				return r
			}
			let $c = !0;

			function La(t) {
				const n = $c;
				return $c = t, n
			}
			let Y0 = 0;
			const On = {};

			function zs(t, n) {
				const e = Gc(t, n);
				if (-1 !== e) return e;
				const r = n[1];
				r.firstCreatePass && (t.injectorIndex = n.length, Uc(r.data, t), Uc(n, null), Uc(r.blueprint, null));
				const i = Pa(t, n),
					s = t.injectorIndex;
				if (Dm(i)) {
					const o = Oi(i),
						a = ki(i, n),
						l = a[1].data;
					for (let u = 0; u < 8; u++) n[s + u] = a[o + u] | l[o + u]
				}
				return n[s + 8] = i, s
			}

			function Uc(t, n) {
				t.push(0, 0, 0, 0, 0, 0, 0, 0, n)
			}

			function Gc(t, n) {
				return -1 === t.injectorIndex || t.parent && t.parent.injectorIndex === t.injectorIndex || null === n[t.injectorIndex + 8] ? -1 : t.injectorIndex
			}

			function Pa(t, n) {
				if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
				let e = 0,
					r = null,
					i = n;
				for (; null !== i;) {
					if (r = Rm(i), null === r) return -1;
					if (e++, i = i[15], -1 !== r.injectorIndex) return r.injectorIndex | e << 16
				}
				return -1
			}

			function Va(t, n, e) {
				! function Z0(t, n, e) {
					let r;
					"string" == typeof e ? r = e.charCodeAt(0) || 0 : e.hasOwnProperty(Ps) && (r = e[Ps]), null == r && (r = e[Ps] = Y0++);
					const i = 255 & r;
					n.data[t + (i >> 5)] |= 1 << i
				}(t, n, e)
			}

			function Mm(t, n, e) {
				if (e & P.Optional || void 0 !== t) return t;
				ba()
			}

			function Am(t, n, e, r) {
				if (e & P.Optional && void 0 === r && (r = null), 0 == (e & (P.Self | P.Host))) {
					const i = t[9],
						s = Jt(void 0);
					try {
						return i ? i.get(n, r, e & P.Optional) : Yg(n, r, e & P.Optional)
					} finally {
						Jt(s)
					}
				}
				return Mm(r, 0, e)
			}

			function Sm(t, n, e, r = P.Default, i) {
				if (null !== t) {
					if (1024 & n[2]) {
						const o = function nS(t, n, e, r, i) {
							let s = t,
								o = n;
							for (; null !== s && null !== o && 1024 & o[2] && !(256 & o[2]);) {
								const a = Im(s, o, e, r | P.Self, On);
								if (a !== On) return a;
								let l = s.parent;
								if (!l) {
									const u = o[21];
									if (u) {
										const c = u.get(e, On, r);
										if (c !== On) return c
									}
									l = Rm(o), o = o[15]
								}
								s = l
							}
							return i
						}(t, n, e, r, On);
						if (o !== On) return o
					}
					const s = Im(t, n, e, r, On);
					if (s !== On) return s
				}
				return Am(n, e, r, i)
			}

			function Im(t, n, e, r, i) {
				const s = function eS(t) {
					if ("string" == typeof t) return t.charCodeAt(0) || 0;
					const n = t.hasOwnProperty(Ps) ? t[Ps] : void 0;
					return "number" == typeof n ? n >= 0 ? 255 & n : tS : n
				}(e);
				if ("function" == typeof s) {
					if (!pm(n, t, r)) return r & P.Host ? Mm(i, 0, r) : Am(n, e, r, i);
					try {
						const o = s(r);
						if (null != o || r & P.Optional) return o;
						ba()
					} finally {
						_m()
					}
				} else if ("number" == typeof s) {
					let o = null,
						a = Gc(t, n),
						l = -1,
						u = r & P.Host ? n[16][6] : null;
					for ((-1 === a || r & P.SkipSelf) && (l = -1 === a ? Pa(t, n) : n[a + 8], -1 !== l && Fm(r, !1) ? (o = n[1], a = Oi(l), n = ki(l, n)) : a = -1); - 1 !== a;) {
						const c = n[1];
						if (Tm(s, a, c.data)) {
							const d = J0(a, n, e, o, r, u);
							if (d !== On) return d
						}
						l = n[a + 8], -1 !== l && Fm(r, n[1].data[a + 8] === u) && Tm(s, a, n) ? (o = c, a = Oi(l), n = ki(l, n)) : a = -1
					}
				}
				return i
			}

			function J0(t, n, e, r, i, s) {
				const o = n[1],
					a = o.data[t + 8],
					c = Ba(a, o, e, null == r ? Aa(a) && $c : r != o && 0 != (3 & a.type), i & P.Host && s === a);
				return null !== c ? Ws(n, o, c, a) : On
			}

			function Ba(t, n, e, r, i) {
				const s = t.providerIndexes,
					o = n.data,
					a = 1048575 & s,
					l = t.directiveStart,
					c = s >> 20,
					f = i ? a + c : t.directiveEnd;
				for (let h = r ? a : a + c; h < f; h++) {
					const g = o[h];
					if (h < l && e === g || h >= l && g.type === e) return h
				}
				if (i) {
					const h = o[l];
					if (h && _n(h) && h.type === e) return l
				}
				return null
			}

			function Ws(t, n, e, r) {
				let i = t[e];
				const s = n.data;
				if (function z0(t) {
						return t instanceof Us
					}(i)) {
					const o = i;
					o.resolving && function QA(t, n) {
						const e = n ? `. Dependency path: ${n.join(" > ")} > ${t}` : "";
						throw new w(-200, `Circular dependency in DI detected for ${t}${e}`)
					}(function ae(t) {
						return "function" == typeof t ? t.name || t.toString() : "object" == typeof t && null != t && "function" == typeof t.type ? t.type.name || t.type.toString() : G(t)
					}(s[e]));
					const a = La(o.canSeeViewProviders);
					o.resolving = !0;
					const l = o.injectImpl ? Jt(o.injectImpl) : null;
					pm(t, r, P.Default);
					try {
						i = t[e] = o.factory(void 0, s, t, r), n.firstCreatePass && e >= r.directiveStart && function U0(t, n, e) {
							const {
								ngOnChanges: r,
								ngOnInit: i,
								ngDoCheck: s
							} = n.type.prototype;
							if (r) {
								const o = rm(n);
								(e.preOrderHooks || (e.preOrderHooks = [])).push(t, o), (e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(t, o)
							}
							i && (e.preOrderHooks || (e.preOrderHooks = [])).push(0 - t, i), s && ((e.preOrderHooks || (e.preOrderHooks = [])).push(t, s), (e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(t, s))
						}(e, s[e], n)
					} finally {
						null !== l && Jt(l), La(a), o.resolving = !1, _m()
					}
				}
				return i
			}

			function Tm(t, n, e) {
				return !!(e[n + (t >> 5)] & 1 << t)
			}

			function Fm(t, n) {
				return !(t & P.Self || t & P.Host && n)
			}
			class Ni {
				constructor(n, e) {
					this._tNode = n, this._lView = e
				}
				get(n, e, r) {
					return Sm(this._tNode, this._lView, n, r, e)
				}
			}

			function tS() {
				return new Ni(Ke(), D())
			}

			function k(t) {
				return wr(() => {
					const n = t.prototype.constructor,
						e = n[Qn] || zc(n),
						r = Object.prototype;
					let i = Object.getPrototypeOf(t.prototype).constructor;
					for (; i && i !== r;) {
						const s = i[Qn] || zc(i);
						if (s && s !== e) return s;
						i = Object.getPrototypeOf(i)
					}
					return s => new s
				})
			}

			function zc(t) {
				return yc(t) ? () => {
					const n = zc(H(t));
					return n && n()
				} : Yr(t)
			}

			function Rm(t) {
				const n = t[1],
					e = n.type;
				return 2 === e ? n.declTNode : 1 === e ? t[6] : null
			}

			function Li(t) {
				return function X0(t, n) {
					if ("class" === n) return t.classes;
					if ("style" === n) return t.styles;
					const e = t.attrs;
					if (e) {
						const r = e.length;
						let i = 0;
						for (; i < r;) {
							const s = e[i];
							if (bm(s)) break;
							if (0 === s) i += 2;
							else if ("number" == typeof s)
								for (i++; i < r && "string" == typeof e[i];) i++;
							else {
								if (s === n) return e[i + 1];
								i += 2
							}
						}
					}
					return null
				}(Ke(), t)
			}
			const Vi = "__parameters__";

			function Hi(t, n, e) {
				return wr(() => {
					const r = function Wc(t) {
						return function(...e) {
							if (t) {
								const r = t(...e);
								for (const i in r) this[i] = r[i]
							}
						}
					}(n);

					function i(...s) {
						if (this instanceof i) return r.apply(this, s), this;
						const o = new i(...s);
						return a.annotation = o, a;

						function a(l, u, c) {
							const d = l.hasOwnProperty(Vi) ? l[Vi] : Object.defineProperty(l, Vi, {
								value: []
							})[Vi];
							for (; d.length <= c;) d.push(null);
							return (d[c] = d[c] || []).push(o), l
						}
					}
					return e && (i.prototype = Object.create(e.prototype)), i.prototype.ngMetadataName = t, i.annotationCls = i, i
				})
			}
			class S {
				constructor(n, e) {
					this._desc = n, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof e ? this.__NG_ELEMENT_ID__ = e : void 0 !== e && (this.\u0275prov = E({
						token: this,
						providedIn: e.providedIn || "root",
						factory: e.factory
					}))
				}
				get multi() {
					return this
				}
				toString() {
					return `InjectionToken ${this._desc}`
				}
			}

			function Bt(t, n) {
				void 0 === n && (n = t);
				for (let e = 0; e < t.length; e++) {
					let r = t[e];
					Array.isArray(r) ? (n === t && (n = t.slice(0, e)), Bt(r, n)) : n !== t && n.push(r)
				}
				return n
			}

			function Xn(t, n) {
				t.forEach(e => Array.isArray(e) ? Xn(e, n) : n(e))
			}

			function km(t, n, e) {
				n >= t.length ? t.push(e) : t.splice(n, 0, e)
			}

			function Ha(t, n) {
				return n >= t.length - 1 ? t.pop() : t.splice(n, 1)[0]
			}

			function Qs(t, n) {
				const e = [];
				for (let r = 0; r < t; r++) e.push(n);
				return e
			}

			function Ht(t, n, e) {
				let r = ji(t, n);
				return r >= 0 ? t[1 | r] = e : (r = ~r, function oS(t, n, e, r) {
					let i = t.length;
					if (i == n) t.push(e, r);
					else if (1 === i) t.push(r, t[0]), t[0] = e;
					else {
						for (i--, t.push(t[i - 1], t[i]); i > n;) t[i] = t[i - 2], i--;
						t[n] = e, t[n + 1] = r
					}
				}(t, r, n, e)), r
			}

			function Kc(t, n) {
				const e = ji(t, n);
				if (e >= 0) return t[1 | e]
			}

			function ji(t, n) {
				return function Pm(t, n, e) {
					let r = 0,
						i = t.length >> e;
					for (; i !== r;) {
						const s = r + (i - r >> 1),
							o = t[s << e];
						if (n === o) return s << e;
						o > n ? i = s : r = s + 1
					}
					return ~(i << e)
				}(t, n, 1)
			}
			const Ys = {},
				Yc = "__NG_DI_FLAG__",
				$a = "ngTempTokenPath",
				pS = /\n/gm,
				Vm = "__source";
			let Zs;

			function $i(t) {
				const n = Zs;
				return Zs = t, n
			}

			function mS(t, n = P.Default) {
				if (void 0 === Zs) throw new w(-203, !1);
				return null === Zs ? Yg(t, void 0, n) : Zs.get(t, n & P.Optional ? null : void 0, n)
			}

			function b(t, n = P.Default) {
				return (function s0() {
					return vc
				}() || mS)(H(t), n)
			}

			function ge(t, n = P.Default) {
				return "number" != typeof n && (n = 0 | (n.optional && 8) | (n.host && 1) | (n.self && 2) | (n.skipSelf && 4)), b(t, n)
			}

			function Zc(t) {
				const n = [];
				for (let e = 0; e < t.length; e++) {
					const r = H(t[e]);
					if (Array.isArray(r)) {
						if (0 === r.length) throw new w(900, !1);
						let i, s = P.Default;
						for (let o = 0; o < r.length; o++) {
							const a = r[o],
								l = yS(a);
							"number" == typeof l ? -1 === l ? i = a.token : s |= l : i = a
						}
						n.push(b(i, s))
					} else n.push(b(r))
				}
				return n
			}

			function Xs(t, n) {
				return t[Yc] = n, t.prototype[Yc] = n, t
			}

			function yS(t) {
				return t[Yc]
			}
			const Er = Xs(Hi("Optional"), 8),
				Ui = Xs(Hi("SkipSelf"), 4);
			let Jc, za;

			function zi(t) {
				return function ed() {
					if (void 0 === za && (za = null, _e.trustedTypes)) try {
						za = _e.trustedTypes.createPolicy("angular", {
							createHTML: t => t,
							createScript: t => t,
							createScriptURL: t => t
						})
					} catch {}
					return za
				}()?.createHTML(t) || t
			}
			class Zr {
				constructor(n) {
					this.changingThisBreaksApplicationSecurity = n
				}
				toString() {
					return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
				}
			}
			class RS extends Zr {
				getTypeName() {
					return "HTML"
				}
			}
			class OS extends Zr {
				getTypeName() {
					return "Style"
				}
			}
			class kS extends Zr {
				getTypeName() {
					return "Script"
				}
			}
			class NS extends Zr {
				getTypeName() {
					return "URL"
				}
			}
			class LS extends Zr {
				getTypeName() {
					return "ResourceURL"
				}
			}

			function jt(t) {
				return t instanceof Zr ? t.changingThisBreaksApplicationSecurity : t
			}

			function kn(t, n) {
				const e = function PS(t) {
					return t instanceof Zr && t.getTypeName() || null
				}(t);
				if (null != e && e !== n) {
					if ("ResourceURL" === e && "URL" === n) return !0;
					throw new Error(`Required a safe ${n}, got a ${e} (see https://g.co/ng/security#xss)`)
				}
				return e === n
			}
			class US {
				constructor(n) {
					this.inertDocumentHelper = n
				}
				getInertBodyElement(n) {
					n = "<body><remove></remove>" + n;
					try {
						const e = (new window.DOMParser).parseFromString(zi(n), "text/html").body;
						return null === e ? this.inertDocumentHelper.getInertBodyElement(n) : (e.removeChild(e.firstChild), e)
					} catch {
						return null
					}
				}
			}
			class GS {
				constructor(n) {
					if (this.defaultDoc = n, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"), null == this.inertDocument.body) {
						const e = this.inertDocument.createElement("html");
						this.inertDocument.appendChild(e);
						const r = this.inertDocument.createElement("body");
						e.appendChild(r)
					}
				}
				getInertBodyElement(n) {
					const e = this.inertDocument.createElement("template");
					if ("content" in e) return e.innerHTML = zi(n), e;
					const r = this.inertDocument.createElement("body");
					return r.innerHTML = zi(n), this.defaultDoc.documentMode && this.stripCustomNsAttrs(r), r
				}
				stripCustomNsAttrs(n) {
					const e = n.attributes;
					for (let i = e.length - 1; 0 < i; i--) {
						const o = e.item(i).name;
						("xmlns:ns1" === o || 0 === o.indexOf("ns1:")) && n.removeAttribute(o)
					}
					let r = n.firstChild;
					for (; r;) r.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(r), r = r.nextSibling
				}
			}
			const WS = /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;

			function qa(t) {
				return (t = String(t)).match(WS) ? t : "unsafe:" + t
			}

			function Jn(t) {
				const n = {};
				for (const e of t.split(",")) n[e] = !0;
				return n
			}

			function to(...t) {
				const n = {};
				for (const e of t)
					for (const r in e) e.hasOwnProperty(r) && (n[r] = !0);
				return n
			}
			const Xm = Jn("area,br,col,hr,img,wbr"),
				Jm = Jn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
				ey = Jn("rp,rt"),
				nd = to(Xm, to(Jm, Jn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), to(ey, Jn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), to(ey, Jm)),
				rd = Jn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
				ty = to(rd, Jn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), Jn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
				qS = Jn("script,style,template");
			class KS {
				constructor() {
					this.sanitizedSomething = !1, this.buf = []
				}
				sanitizeChildren(n) {
					let e = n.firstChild,
						r = !0;
					for (; e;)
						if (e.nodeType === Node.ELEMENT_NODE ? r = this.startElement(e) : e.nodeType === Node.TEXT_NODE ? this.chars(e.nodeValue) : this.sanitizedSomething = !0, r && e.firstChild) e = e.firstChild;
						else
							for (; e;) {
								e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
								let i = this.checkClobberedElement(e, e.nextSibling);
								if (i) {
									e = i;
									break
								}
								e = this.checkClobberedElement(e, e.parentNode)
							}
					return this.buf.join("")
				}
				startElement(n) {
					const e = n.nodeName.toLowerCase();
					if (!nd.hasOwnProperty(e)) return this.sanitizedSomething = !0, !qS.hasOwnProperty(e);
					this.buf.push("<"), this.buf.push(e);
					const r = n.attributes;
					for (let i = 0; i < r.length; i++) {
						const s = r.item(i),
							o = s.name,
							a = o.toLowerCase();
						if (!ty.hasOwnProperty(a)) {
							this.sanitizedSomething = !0;
							continue
						}
						let l = s.value;
						rd[a] && (l = qa(l)), this.buf.push(" ", o, '="', ny(l), '"')
					}
					return this.buf.push(">"), !0
				}
				endElement(n) {
					const e = n.nodeName.toLowerCase();
					nd.hasOwnProperty(e) && !Xm.hasOwnProperty(e) && (this.buf.push("</"), this.buf.push(e), this.buf.push(">"))
				}
				chars(n) {
					this.buf.push(ny(n))
				}
				checkClobberedElement(n, e) {
					if (e && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) throw new Error(`Failed to sanitize html because the element is clobbered: ${n.outerHTML}`);
					return e
				}
			}
			const QS = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
				YS = /([^\#-~ |!])/g;

			function ny(t) {
				return t.replace(/&/g, "&amp;").replace(QS, function(n) {
					return "&#" + (1024 * (n.charCodeAt(0) - 55296) + (n.charCodeAt(1) - 56320) + 65536) + ";"
				}).replace(YS, function(n) {
					return "&#" + n.charCodeAt(0) + ";"
				}).replace(/</g, "&lt;").replace(/>/g, "&gt;")
			}
			let Ka;

			function ry(t, n) {
				let e = null;
				try {
					Ka = Ka || function Zm(t) {
						const n = new GS(t);
						return function zS() {
							try {
								return !!(new window.DOMParser).parseFromString(zi(""), "text/html")
							} catch {
								return !1
							}
						}() ? new US(n) : n
					}(t);
					let r = n ? String(n) : "";
					e = Ka.getInertBodyElement(r);
					let i = 5,
						s = r;
					do {
						if (0 === i) throw new Error("Failed to sanitize html because the input is unstable");
						i--, r = s, s = e.innerHTML, e = Ka.getInertBodyElement(r)
					} while (r !== s);
					return zi((new KS).sanitizeChildren(id(e) || e))
				} finally {
					if (e) {
						const r = id(e) || e;
						for (; r.firstChild;) r.removeChild(r.firstChild)
					}
				}
			}

			function id(t) {
				return "content" in t && function ZS(t) {
					return t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
				}(t) ? t.content : null
			}
			var ie = (() => ((ie = ie || {})[ie.NONE = 0] = "NONE", ie[ie.HTML = 1] = "HTML", ie[ie.STYLE = 2] = "STYLE", ie[ie.SCRIPT = 3] = "SCRIPT", ie[ie.URL = 4] = "URL", ie[ie.RESOURCE_URL = 5] = "RESOURCE_URL", ie))();
			const od = new S("ENVIRONMENT_INITIALIZER"),
				sy = new S("INJECTOR", -1),
				oy = new S("INJECTOR_DEF_TYPES");
			class ay {
				get(n, e = Ys) {
					if (e === Ys) {
						const r = new Error(`NullInjectorError: No provider for ${pe(n)}!`);
						throw r.name = "NullInjectorError", r
					}
					return e
				}
			}

			function sI(...t) {
				return {
					\u0275providers: ly(0, t)
				}
			}

			function ly(t, ...n) {
				const e = [],
					r = new Set;
				let i;
				return Xn(n, s => {
					const o = s;
					ad(o, e, [], r) && (i || (i = []), i.push(o))
				}), void 0 !== i && uy(i, e), e
			}

			function uy(t, n) {
				for (let e = 0; e < t.length; e++) {
					const {
						providers: i
					} = t[e];
					Xn(i, s => {
						n.push(s)
					})
				}
			}

			function ad(t, n, e, r) {
				if (!(t = H(t))) return !1;
				let i = null,
					s = Kg(t);
				const o = !s && fe(t);
				if (s || o) {
					if (o && !o.standalone) return !1;
					i = t
				} else {
					const l = t.ngModule;
					if (s = Kg(l), !s) return !1;
					i = l
				}
				const a = r.has(i);
				if (o) {
					if (a) return !1;
					if (r.add(i), o.dependencies) {
						const l = "function" == typeof o.dependencies ? o.dependencies() : o.dependencies;
						for (const u of l) ad(u, n, e, r)
					}
				} else {
					if (!s) return !1; {
						if (null != s.imports && !a) {
							let u;
							r.add(i);
							try {
								Xn(s.imports, c => {
									ad(c, n, e, r) && (u || (u = []), u.push(c))
								})
							} finally {}
							void 0 !== u && uy(u, n)
						}
						if (!a) {
							const u = Yr(i) || (() => new i);
							n.push({
								provide: i,
								useFactory: u,
								deps: le
							}, {
								provide: oy,
								useValue: i,
								multi: !0
							}, {
								provide: od,
								useValue: () => b(i),
								multi: !0
							})
						}
						const l = s.providers;
						null == l || a || Xn(l, c => {
							n.push(c)
						})
					}
				}
				return i !== t && void 0 !== t.providers
			}
			const oI = he({
				provide: String,
				useValue: he
			});

			function ld(t) {
				return null !== t && "object" == typeof t && oI in t
			}

			function Xr(t) {
				return "function" == typeof t
			}
			const ud = new S("Set Injector scope."),
				Qa = {},
				lI = {};
			let cd;

			function Ya() {
				return void 0 === cd && (cd = new ay), cd
			}
			class Mr {}
			class fy extends Mr {
				constructor(n, e, r, i) {
					super(), this.parent = e, this.source = r, this.scopes = i, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, fd(n, o => this.processProvider(o)), this.records.set(sy, Wi(void 0, this)), i.has("environment") && this.records.set(Mr, Wi(void 0, this));
					const s = this.records.get(ud);
					null != s && "string" == typeof s.value && this.scopes.add(s.value), this.injectorDefTypes = new Set(this.get(oy.multi, le, P.Self))
				}
				get destroyed() {
					return this._destroyed
				}
				destroy() {
					this.assertNotDestroyed(), this._destroyed = !0;
					try {
						for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
						for (const n of this._onDestroyHooks) n()
					} finally {
						this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), this._onDestroyHooks.length = 0
					}
				}
				onDestroy(n) {
					this._onDestroyHooks.push(n)
				}
				runInContext(n) {
					this.assertNotDestroyed();
					const e = $i(this),
						r = Jt(void 0);
					try {
						return n()
					} finally {
						$i(e), Jt(r)
					}
				}
				get(n, e = Ys, r = P.Default) {
					this.assertNotDestroyed();
					const i = $i(this),
						s = Jt(void 0);
					try {
						if (!(r & P.SkipSelf)) {
							let a = this.records.get(n);
							if (void 0 === a) {
								const l = function hI(t) {
									return "function" == typeof t || "object" == typeof t && t instanceof S
								}(n) && wa(n);
								a = l && this.injectableDefInScope(l) ? Wi(dd(n), Qa) : null, this.records.set(n, a)
							}
							if (null != a) return this.hydrate(n, a)
						}
						return (r & P.Self ? Ya() : this.parent).get(n, e = r & P.Optional && e === Ys ? null : e)
					} catch (o) {
						if ("NullInjectorError" === o.name) {
							if ((o[$a] = o[$a] || []).unshift(pe(n)), i) throw o;
							return function _S(t, n, e, r) {
								const i = t[$a];
								throw n[Vm] && i.unshift(n[Vm]), t.message = function vS(t, n, e, r = null) {
									t = t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1) ? t.slice(2) : t;
									let i = pe(n);
									if (Array.isArray(n)) i = n.map(pe).join(" -> ");
									else if ("object" == typeof n) {
										let s = [];
										for (let o in n)
											if (n.hasOwnProperty(o)) {
												let a = n[o];
												s.push(o + ":" + ("string" == typeof a ? JSON.stringify(a) : pe(a)))
											} i = `{${s.join(", ")}}`
									}
									return `${e}${r?"("+r+")":""}[${i}]: ${t.replace(pS,"\n  ")}`
								}("\n" + t.message, i, e, r), t.ngTokenPath = i, t[$a] = null, t
							}(o, n, "R3InjectorError", this.source)
						}
						throw o
					} finally {
						Jt(s), $i(i)
					}
				}
				resolveInjectorInitializers() {
					const n = $i(this),
						e = Jt(void 0);
					try {
						const r = this.get(od.multi, le, P.Self);
						for (const i of r) i()
					} finally {
						$i(n), Jt(e)
					}
				}
				toString() {
					const n = [],
						e = this.records;
					for (const r of e.keys()) n.push(pe(r));
					return `R3Injector[${n.join(", ")}]`
				}
				assertNotDestroyed() {
					if (this._destroyed) throw new w(205, !1)
				}
				processProvider(n) {
					let e = Xr(n = H(n)) ? n : H(n && n.provide);
					const r = function cI(t) {
						return ld(t) ? Wi(void 0, t.useValue) : Wi(hy(t), Qa)
					}(n);
					if (Xr(n) || !0 !== n.multi) this.records.get(e);
					else {
						let i = this.records.get(e);
						i || (i = Wi(void 0, Qa, !0), i.factory = () => Zc(i.multi), this.records.set(e, i)), e = n, i.multi.push(n)
					}
					this.records.set(e, r)
				}
				hydrate(n, e) {
					return e.value === Qa && (e.value = lI, e.value = e.factory()), "object" == typeof e.value && e.value && function fI(t) {
						return null !== t && "object" == typeof t && "function" == typeof t.ngOnDestroy
					}(e.value) && this._ngOnDestroyHooks.add(e.value), e.value
				}
				injectableDefInScope(n) {
					if (!n.providedIn) return !1;
					const e = H(n.providedIn);
					return "string" == typeof e ? "any" === e || this.scopes.has(e) : this.injectorDefTypes.has(e)
				}
			}

			function dd(t) {
				const n = wa(t),
					e = null !== n ? n.factory : Yr(t);
				if (null !== e) return e;
				if (t instanceof S) throw new w(204, !1);
				if (t instanceof Function) return function uI(t) {
					const n = t.length;
					if (n > 0) throw Qs(n, "?"), new w(204, !1);
					const e = function t0(t) {
						const n = t && (t[Ca] || t[Qg]);
						if (n) {
							const e = function n0(t) {
								if (t.hasOwnProperty("name")) return t.name;
								const n = ("" + t).match(/^function\s*([^\s(]+)/);
								return null === n ? "" : n[1]
							}(t);
							return console.warn(`DEPRECATED: DI is instantiating a token "${e}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${e}" class.`), n
						}
						return null
					}(t);
					return null !== e ? () => e.factory(t) : () => new t
				}(t);
				throw new w(204, !1)
			}

			function hy(t, n, e) {
				let r;
				if (Xr(t)) {
					const i = H(t);
					return Yr(i) || dd(i)
				}
				if (ld(t)) r = () => H(t.useValue);
				else if (function dy(t) {
						return !(!t || !t.useFactory)
					}(t)) r = () => t.useFactory(...Zc(t.deps || []));
				else if (function cy(t) {
						return !(!t || !t.useExisting)
					}(t)) r = () => b(H(t.useExisting));
				else {
					const i = H(t && (t.useClass || t.provide));
					if (! function dI(t) {
							return !!t.deps
						}(t)) return Yr(i) || dd(i);
					r = () => new i(...Zc(t.deps))
				}
				return r
			}

			function Wi(t, n, e = !1) {
				return {
					factory: t,
					value: n,
					multi: e ? [] : void 0
				}
			}

			function pI(t) {
				return !!t.\u0275providers
			}

			function fd(t, n) {
				for (const e of t) Array.isArray(e) ? fd(e, n) : pI(e) ? fd(e.\u0275providers, n) : n(e)
			}
			class py {}
			class yI {
				resolveComponentFactory(n) {
					throw function mI(t) {
						const n = Error(`No component factory found for ${pe(t)}. Did you add it to @NgModule.entryComponents?`);
						return n.ngComponent = t, n
					}(n)
				}
			}
			let ro = (() => {
				class t {}
				return t.NULL = new yI, t
			})();

			function _I() {
				return qi(Ke(), D())
			}

			function qi(t, n) {
				return new U(rn(t, n))
			}
			let U = (() => {
				class t {
					constructor(e) {
						this.nativeElement = e
					}
				}
				return t.__NG_ELEMENT_ID__ = _I, t
			})();

			function vI(t) {
				return t instanceof U ? t.nativeElement : t
			}
			class io {}
			let wI = (() => {
				class t {}
				return t.\u0275prov = E({
					token: t,
					providedIn: "root",
					factory: () => null
				}), t
			})();
			class Ar {
				constructor(n) {
					this.full = n, this.major = n.split(".")[0], this.minor = n.split(".")[1], this.patch = n.split(".").slice(2).join(".")
				}
			}
			const CI = new Ar("14.2.8"),
				hd = {};

			function _d(t) {
				return t.ngOriginalError
			}
			class er {
				constructor() {
					this._console = console
				}
				handleError(n) {
					const e = this._findOriginalError(n);
					this._console.error("ERROR", n), e && this._console.error("ORIGINAL ERROR", e)
				}
				_findOriginalError(n) {
					let e = n && _d(n);
					for (; e && _d(e);) e = _d(e);
					return e || null
				}
			}
			const vd = new Map;
			let kI = 0;
			const wd = "__ngContext__";

			function lt(t, n) {
				At(n) ? (t[wd] = n[20], function LI(t) {
					vd.set(t[20], t)
				}(n)) : t[wd] = n
			}

			function tr(t) {
				return t instanceof Function ? t() : t
			}
			var St = (() => ((St = St || {})[St.Important = 1] = "Important", St[St.DashCase = 2] = "DashCase", St))();

			function Dd(t, n) {
				return undefined(t, n)
			}

			function oo(t) {
				const n = t[3];
				return yn(n) ? n[3] : n
			}

			function xd(t) {
				return Iy(t[13])
			}

			function Ed(t) {
				return Iy(t[4])
			}

			function Iy(t) {
				for (; null !== t && !yn(t);) t = t[4];
				return t
			}

			function Qi(t, n, e, r, i) {
				if (null != r) {
					let s, o = !1;
					yn(r) ? s = r : At(r) && (o = !0, r = r[0]);
					const a = Ue(r);
					0 === t && null !== e ? null == i ? Ny(n, e, a) : Jr(n, e, a, i || null, !0) : 1 === t && null !== e ? Jr(n, e, a, i || null, !0) : 2 === t ? function $y(t, n, e) {
						const r = Za(t, n);
						r && function uT(t, n, e, r) {
							t.removeChild(n, e, r)
						}(t, r, n, e)
					}(n, a, o) : 3 === t && n.destroyNode(a), null != s && function fT(t, n, e, r, i) {
						const s = e[7];
						s !== Ue(e) && Qi(n, t, r, s, i);
						for (let a = 10; a < e.length; a++) {
							const l = e[a];
							ao(l[1], l, t, n, r, s)
						}
					}(n, t, s, e, i)
				}
			}

			function Ad(t, n, e) {
				return t.createElement(n, e)
			}

			function Fy(t, n) {
				const e = t[9],
					r = e.indexOf(n),
					i = n[3];
				512 & n[2] && (n[2] &= -513, Tc(i, -1)), e.splice(r, 1)
			}

			function Sd(t, n) {
				if (t.length <= 10) return;
				const e = 10 + n,
					r = t[e];
				if (r) {
					const i = r[17];
					null !== i && i !== t && Fy(i, r), n > 0 && (t[e - 1][4] = r[4]);
					const s = Ha(t, 10 + n);
					! function tT(t, n) {
						ao(t, n, n[Q], 2, null, null), n[0] = null, n[6] = null
					}(r[1], r);
					const o = s[19];
					null !== o && o.detachView(s[1]), r[3] = null, r[4] = null, r[2] &= -65
				}
				return r
			}

			function Ry(t, n) {
				if (!(128 & n[2])) {
					const e = n[Q];
					e.destroyNode && ao(t, n, e, 3, null, null),
						function iT(t) {
							let n = t[13];
							if (!n) return Id(t[1], t);
							for (; n;) {
								let e = null;
								if (At(n)) e = n[13];
								else {
									const r = n[10];
									r && (e = r)
								}
								if (!e) {
									for (; n && !n[4] && n !== t;) At(n) && Id(n[1], n), n = n[3];
									null === n && (n = t), At(n) && Id(n[1], n), e = n && n[4]
								}
								n = e
							}
						}(n)
				}
			}

			function Id(t, n) {
				if (!(128 & n[2])) {
					n[2] &= -65, n[2] |= 128,
						function lT(t, n) {
							let e;
							if (null != t && null != (e = t.destroyHooks))
								for (let r = 0; r < e.length; r += 2) {
									const i = n[e[r]];
									if (!(i instanceof Us)) {
										const s = e[r + 1];
										if (Array.isArray(s))
											for (let o = 0; o < s.length; o += 2) {
												const a = i[s[o]],
													l = s[o + 1];
												try {
													l.call(a)
												} finally {}
											} else try {
												s.call(i)
											} finally {}
									}
								}
						}(t, n),
						function aT(t, n) {
							const e = t.cleanup,
								r = n[7];
							let i = -1;
							if (null !== e)
								for (let s = 0; s < e.length - 1; s += 2)
									if ("string" == typeof e[s]) {
										const o = e[s + 1],
											a = "function" == typeof o ? o(n) : Ue(n[o]),
											l = r[i = e[s + 2]],
											u = e[s + 3];
										"boolean" == typeof u ? a.removeEventListener(e[s], l, u) : u >= 0 ? r[i = u]() : r[i = -u].unsubscribe(), s += 2
									} else {
										const o = r[i = e[s + 1]];
										e[s].call(o)
									} if (null !== r) {
								for (let s = i + 1; s < r.length; s++)(0, r[s])();
								n[7] = null
							}
						}(t, n), 1 === n[1].type && n[Q].destroy();
					const e = n[17];
					if (null !== e && yn(n[3])) {
						e !== n[3] && Fy(e, n);
						const r = n[19];
						null !== r && r.detachView(t)
					}! function PI(t) {
						vd.delete(t[20])
					}(n)
				}
			}

			function Oy(t, n, e) {
				return function ky(t, n, e) {
					let r = n;
					for (; null !== r && 40 & r.type;) r = (n = r).parent;
					if (null === r) return e[0];
					if (2 & r.flags) {
						const i = t.data[r.directiveStart].encapsulation;
						if (i === gn.None || i === gn.Emulated) return null
					}
					return rn(r, e)
				}(t, n.parent, e)
			}

			function Jr(t, n, e, r, i) {
				t.insertBefore(n, e, r, i)
			}

			function Ny(t, n, e) {
				t.appendChild(n, e)
			}

			function Ly(t, n, e, r, i) {
				null !== r ? Jr(t, n, e, r, i) : Ny(t, n, e)
			}

			function Za(t, n) {
				return t.parentNode(n)
			}

			function Py(t, n, e) {
				return By(t, n, e)
			}
			let By = function Vy(t, n, e) {
				return 40 & t.type ? rn(t, e) : null
			};

			function Xa(t, n, e, r) {
				const i = Oy(t, r, n),
					s = n[Q],
					a = Py(r.parent || n[6], r, n);
				if (null != i)
					if (Array.isArray(e))
						for (let l = 0; l < e.length; l++) Ly(s, i, e[l], a, !1);
					else Ly(s, i, e, a, !1)
			}

			function Ja(t, n) {
				if (null !== n) {
					const e = n.type;
					if (3 & e) return rn(n, t);
					if (4 & e) return Fd(-1, t[n.index]);
					if (8 & e) {
						const r = n.child;
						if (null !== r) return Ja(t, r); {
							const i = t[n.index];
							return yn(i) ? Fd(-1, i) : Ue(i)
						}
					}
					if (32 & e) return Dd(n, t)() || Ue(t[n.index]); {
						const r = jy(t, n);
						return null !== r ? Array.isArray(r) ? r[0] : Ja(oo(t[16]), r) : Ja(t, n.next)
					}
				}
				return null
			}

			function jy(t, n) {
				return null !== n ? t[16][6].projection[n.projection] : null
			}

			function Fd(t, n) {
				const e = 10 + t + 1;
				if (e < n.length) {
					const r = n[e],
						i = r[1].firstChild;
					if (null !== i) return Ja(r, i)
				}
				return n[7]
			}

			function Rd(t, n, e, r, i, s, o) {
				for (; null != e;) {
					const a = r[e.index],
						l = e.type;
					if (o && 0 === n && (a && lt(Ue(a), r), e.flags |= 4), 64 != (64 & e.flags))
						if (8 & l) Rd(t, n, e.child, r, i, s, !1), Qi(n, t, i, a, s);
						else if (32 & l) {
						const u = Dd(e, r);
						let c;
						for (; c = u();) Qi(n, t, i, c, s);
						Qi(n, t, i, a, s)
					} else 16 & l ? Uy(t, n, r, e, i, s) : Qi(n, t, i, a, s);
					e = o ? e.projectionNext : e.next
				}
			}

			function ao(t, n, e, r, i, s) {
				Rd(e, r, t.firstChild, n, i, s, !1)
			}

			function Uy(t, n, e, r, i, s) {
				const o = e[16],
					l = o[6].projection[r.projection];
				if (Array.isArray(l))
					for (let u = 0; u < l.length; u++) Qi(n, t, i, l[u], s);
				else Rd(t, n, l, o[3], i, s, !0)
			}

			function Gy(t, n, e) {
				t.setAttribute(n, "style", e)
			}

			function Od(t, n, e) {
				"" === e ? t.removeAttribute(n, "class") : t.setAttribute(n, "class", e)
			}

			function zy(t, n, e) {
				let r = t.length;
				for (;;) {
					const i = t.indexOf(n, e);
					if (-1 === i) return i;
					if (0 === i || t.charCodeAt(i - 1) <= 32) {
						const s = n.length;
						if (i + s === r || t.charCodeAt(i + s) <= 32) return i
					}
					e = i + 1
				}
			}
			const Wy = "ng-template";

			function pT(t, n, e) {
				let r = 0;
				for (; r < t.length;) {
					let i = t[r++];
					if (e && "class" === i) {
						if (i = t[r], -1 !== zy(i.toLowerCase(), n, 0)) return !0
					} else if (1 === i) {
						for (; r < t.length && "string" == typeof(i = t[r++]);)
							if (i.toLowerCase() === n) return !0;
						return !1
					}
				}
				return !1
			}

			function qy(t) {
				return 4 === t.type && t.value !== Wy
			}

			function gT(t, n, e) {
				return n === (4 !== t.type || e ? t.value : Wy)
			}

			function mT(t, n, e) {
				let r = 4;
				const i = t.attrs || [],
					s = function vT(t) {
						for (let n = 0; n < t.length; n++)
							if (bm(t[n])) return n;
						return t.length
					}(i);
				let o = !1;
				for (let a = 0; a < n.length; a++) {
					const l = n[a];
					if ("number" != typeof l) {
						if (!o)
							if (4 & r) {
								if (r = 2 | 1 & r, "" !== l && !gT(t, l, e) || "" === l && 1 === n.length) {
									if (bn(r)) return !1;
									o = !0
								}
							} else {
								const u = 8 & r ? l : n[++a];
								if (8 & r && null !== t.attrs) {
									if (!pT(t.attrs, u, e)) {
										if (bn(r)) return !1;
										o = !0
									}
									continue
								}
								const d = yT(8 & r ? "class" : l, i, qy(t), e);
								if (-1 === d) {
									if (bn(r)) return !1;
									o = !0;
									continue
								}
								if ("" !== u) {
									let f;
									f = d > s ? "" : i[d + 1].toLowerCase();
									const h = 8 & r ? f : null;
									if (h && -1 !== zy(h, u, 0) || 2 & r && u !== f) {
										if (bn(r)) return !1;
										o = !0
									}
								}
							}
					} else {
						if (!o && !bn(r) && !bn(l)) return !1;
						if (o && bn(l)) continue;
						o = !1, r = l | 1 & r
					}
				}
				return bn(r) || o
			}

			function bn(t) {
				return 0 == (1 & t)
			}

			function yT(t, n, e, r) {
				if (null === n) return -1;
				let i = 0;
				if (r || !e) {
					let s = !1;
					for (; i < n.length;) {
						const o = n[i];
						if (o === t) return i;
						if (3 === o || 6 === o) s = !0;
						else {
							if (1 === o || 2 === o) {
								let a = n[++i];
								for (;
									"string" == typeof a;) a = n[++i];
								continue
							}
							if (4 === o) break;
							if (0 === o) {
								i += 4;
								continue
							}
						}
						i += s ? 1 : 2
					}
					return -1
				}
				return function bT(t, n) {
					let e = t.indexOf(4);
					if (e > -1)
						for (e++; e < t.length;) {
							const r = t[e];
							if ("number" == typeof r) return -1;
							if (r === n) return e;
							e++
						}
					return -1
				}(n, t)
			}

			function Ky(t, n, e = !1) {
				for (let r = 0; r < n.length; r++)
					if (mT(t, n[r], e)) return !0;
				return !1
			}

			function wT(t, n) {
				e: for (let e = 0; e < n.length; e++) {
					const r = n[e];
					if (t.length === r.length) {
						for (let i = 0; i < t.length; i++)
							if (t[i] !== r[i]) continue e;
						return !0
					}
				}
				return !1
			}

			function Qy(t, n) {
				return t ? ":not(" + n.trim() + ")" : n
			}

			function CT(t) {
				let n = t[0],
					e = 1,
					r = 2,
					i = "",
					s = !1;
				for (; e < t.length;) {
					let o = t[e];
					if ("string" == typeof o)
						if (2 & r) {
							const a = t[++e];
							i += "[" + o + (a.length > 0 ? '="' + a + '"' : "") + "]"
						} else 8 & r ? i += "." + o : 4 & r && (i += " " + o);
					else "" !== i && !bn(o) && (n += Qy(s, i), i = ""), r = o, s = s || !bn(r);
					e++
				}
				return "" !== i && (n += Qy(s, i)), n
			}
			const z = {};

			function Ye(t) {
				Yy(te(), D(), _t() + t, !1)
			}

			function Yy(t, n, e, r) {
				if (!r)
					if (3 == (3 & n[2])) {
						const s = t.preOrderCheckHooks;
						null !== s && Ra(n, s, e)
					} else {
						const s = t.preOrderHooks;
						null !== s && Oa(n, s, 0, e)
					} Dr(e)
			}

			function e_(t, n = null, e = null, r) {
				const i = t_(t, n, e, r);
				return i.resolveInjectorInitializers(), i
			}

			function t_(t, n = null, e = null, r, i = new Set) {
				const s = [e || le, sI(t)];
				return r = r || ("object" == typeof t ? void 0 : pe(t)), new fy(s, n || Ya(), r || null, i)
			}
			let It = (() => {
				class t {
					static create(e, r) {
						if (Array.isArray(e)) return e_({
							name: ""
						}, r, e, ""); {
							const i = e.name ?? "";
							return e_({
								name: i
							}, e.parent, e.providers, i)
						}
					}
				}
				return t.THROW_IF_NOT_FOUND = Ys, t.NULL = new ay, t.\u0275prov = E({
					token: t,
					providedIn: "any",
					factory: () => b(sy)
				}), t.__NG_ELEMENT_ID__ = -1, t
			})();

			function p(t, n = P.Default) {
				const e = D();
				return null === e ? b(t, n) : Sm(Ke(), e, H(t), n)
			}

			function Vd() {
				throw new Error("invalid")
			}

			function tl(t, n) {
				return t << 17 | n << 2
			}

			function wn(t) {
				return t >> 17 & 32767
			}

			function Bd(t) {
				return 2 | t
			}

			function nr(t) {
				return (131068 & t) >> 2
			}

			function Hd(t, n) {
				return -131069 & t | n << 2
			}

			function jd(t) {
				return 1 | t
			}

			function __(t, n) {
				const e = t.contentQueries;
				if (null !== e)
					for (let r = 0; r < e.length; r += 2) {
						const i = e[r],
							s = e[r + 1];
						if (-1 !== s) {
							const o = t.data[s];
							Pc(i), o.contentQueries(2, n[s], s)
						}
					}
			}

			function il(t, n, e, r, i, s, o, a, l, u, c) {
				const d = n.blueprint.slice();
				return d[0] = i, d[2] = 76 | r, (null !== c || t && 1024 & t[2]) && (d[2] |= 1024), om(d), d[3] = d[15] = t, d[8] = e, d[10] = o || t && t[10], d[Q] = a || t && t[Q], d[12] = l || t && t[12] || null, d[9] = u || t && t[9] || null, d[6] = s, d[20] = function NI() {
					return kI++
				}(), d[21] = c, d[16] = 2 == n.type ? t[16] : d, d
			}

			function Zi(t, n, e, r, i) {
				let s = t.data[n];
				if (null === s) s = function Qd(t, n, e, r, i) {
						const s = um(),
							o = Oc(),
							l = t.data[n] = function iF(t, n, e, r, i, s) {
								return {
									type: e,
									index: r,
									insertBeforeIndex: null,
									injectorIndex: n ? n.injectorIndex : -1,
									directiveStart: -1,
									directiveEnd: -1,
									directiveStylingLast: -1,
									propertyBindings: null,
									flags: 0,
									providerIndexes: 0,
									value: i,
									attrs: s,
									mergedAttrs: null,
									localNames: null,
									initialInputs: void 0,
									inputs: null,
									outputs: null,
									tViews: null,
									next: null,
									projectionNext: null,
									child: null,
									parent: n,
									projection: null,
									styles: null,
									stylesWithoutHost: null,
									residualStyles: void 0,
									classes: null,
									classesWithoutHost: null,
									residualClasses: void 0,
									classBindings: 0,
									styleBindings: 0
								}
							}(0, o ? s : s && s.parent, e, n, r, i);
						return null === t.firstChild && (t.firstChild = l), null !== s && (o ? null == s.child && null !== l.parent && (s.child = l) : null === s.next && (s.next = l)), l
					}(t, n, e, r, i),
					function R0() {
						return $.lFrame.inI18n
					}() && (s.flags |= 64);
				else if (64 & s.type) {
					s.type = e, s.value = r, s.attrs = i;
					const o = function $s() {
						const t = $.lFrame,
							n = t.currentTNode;
						return t.isParent ? n : n.parent
					}();
					s.injectorIndex = null === o ? -1 : o.injectorIndex
				}
				return Rn(s, !0), s
			}

			function Xi(t, n, e, r) {
				if (0 === e) return -1;
				const i = n.length;
				for (let s = 0; s < e; s++) n.push(r), t.blueprint.push(r), t.data.push(null);
				return i
			}

			function Yd(t, n, e) {
				Vc(n);
				try {
					const r = t.viewQuery;
					null !== r && sf(1, r, e);
					const i = t.template;
					null !== i && v_(t, n, i, 1, e), t.firstCreatePass && (t.firstCreatePass = !1), t.staticContentQueries && __(t, n), t.staticViewQueries && sf(2, t.viewQuery, e);
					const s = t.components;
					null !== s && function tF(t, n) {
						for (let e = 0; e < n.length; e++) bF(t, n[e])
					}(n, s)
				} catch (r) {
					throw t.firstCreatePass && (t.incompleteFirstPass = !0, t.firstCreatePass = !1), r
				} finally {
					n[2] &= -5, Bc()
				}
			}

			function sl(t, n, e, r) {
				const i = n[2];
				if (128 != (128 & i)) {
					Vc(n);
					try {
						om(n),
							function dm(t) {
								return $.lFrame.bindingIndex = t
							}(t.bindingStartIndex), null !== e && v_(t, n, e, 2, r);
						const o = 3 == (3 & i);
						if (o) {
							const u = t.preOrderCheckHooks;
							null !== u && Ra(n, u, null)
						} else {
							const u = t.preOrderHooks;
							null !== u && Oa(n, u, 0, null), Hc(n, 0)
						}
						if (function _F(t) {
								for (let n = xd(t); null !== n; n = Ed(n)) {
									if (!n[2]) continue;
									const e = n[9];
									for (let r = 0; r < e.length; r++) {
										const i = e[r],
											s = i[3];
										0 == (512 & i[2]) && Tc(s, 1), i[2] |= 512
									}
								}
							}(n), function yF(t) {
								for (let n = xd(t); null !== n; n = Ed(n))
									for (let e = 10; e < n.length; e++) {
										const r = n[e],
											i = r[1];
										Ta(r) && sl(i, r, i.template, r[8])
									}
							}(n), null !== t.contentQueries && __(t, n), o) {
							const u = t.contentCheckHooks;
							null !== u && Ra(n, u)
						} else {
							const u = t.contentHooks;
							null !== u && Oa(n, u, 1), Hc(n, 1)
						}! function JT(t, n) {
							const e = t.hostBindingOpCodes;
							if (null !== e) try {
								for (let r = 0; r < e.length; r++) {
									const i = e[r];
									if (i < 0) Dr(~i);
									else {
										const s = i,
											o = e[++r],
											a = e[++r];
										O0(o, s), a(2, n[s])
									}
								}
							} finally {
								Dr(-1)
							}
						}(t, n);
						const a = t.components;
						null !== a && function eF(t, n) {
							for (let e = 0; e < n.length; e++) vF(t, n[e])
						}(n, a);
						const l = t.viewQuery;
						if (null !== l && sf(2, l, r), o) {
							const u = t.viewCheckHooks;
							null !== u && Ra(n, u)
						} else {
							const u = t.viewHooks;
							null !== u && Oa(n, u, 2), Hc(n, 2)
						}!0 === t.firstUpdatePass && (t.firstUpdatePass = !1), n[2] &= -41, 512 & n[2] && (n[2] &= -513, Tc(n[3], -1))
					} finally {
						Bc()
					}
				}
			}

			function v_(t, n, e, r, i) {
				const s = _t(),
					o = 2 & r;
				try {
					Dr(-1), o && n.length > 22 && Yy(t, n, 22, !1), e(r, i)
				} finally {
					Dr(s)
				}
			}

			function b_(t, n, e) {
				if (xc(n)) {
					const i = n.directiveEnd;
					for (let s = n.directiveStart; s < i; s++) {
						const o = t.data[s];
						o.contentQueries && o.contentQueries(1, e[s], s)
					}
				}
			}

			function Zd(t, n, e) {
				!lm() || (function uF(t, n, e, r) {
					const i = e.directiveStart,
						s = e.directiveEnd;
					t.firstCreatePass || zs(e, n), lt(r, n);
					const o = e.initialInputs;
					for (let a = i; a < s; a++) {
						const l = t.data[a],
							u = _n(l);
						u && pF(n, e, l);
						const c = Ws(n, t, a, e);
						lt(c, n), null !== o && gF(0, a - i, c, l, 0, o), u && (Vt(e.index, n)[8] = c)
					}
				}(t, n, e, rn(e, n)), 128 == (128 & e.flags) && function cF(t, n, e) {
					const r = e.directiveStart,
						i = e.directiveEnd,
						s = e.index,
						o = function k0() {
							return $.lFrame.currentDirectiveIndex
						}();
					try {
						Dr(s);
						for (let a = r; a < i; a++) {
							const l = t.data[a],
								u = n[a];
							Nc(a), (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && A_(l, u)
						}
					} finally {
						Dr(-1), Nc(o)
					}
				}(t, n, e))
			}

			function Xd(t, n, e = rn) {
				const r = n.localNames;
				if (null !== r) {
					let i = n.index + 1;
					for (let s = 0; s < r.length; s += 2) {
						const o = r[s + 1],
							a = -1 === o ? e(n, t) : t[o];
						t[i++] = a
					}
				}
			}

			function w_(t) {
				const n = t.tView;
				return null === n || n.incompleteFirstPass ? t.tView = Jd(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts) : n
			}

			function Jd(t, n, e, r, i, s, o, a, l, u) {
				const c = 22 + r,
					d = c + i,
					f = function nF(t, n) {
						const e = [];
						for (let r = 0; r < n; r++) e.push(r < t ? null : z);
						return e
					}(c, d),
					h = "function" == typeof u ? u() : u;
				return f[1] = {
					type: t,
					blueprint: f,
					template: e,
					queries: null,
					viewQuery: a,
					declTNode: n,
					data: f.slice().fill(null, c),
					bindingStartIndex: c,
					expandoStartIndex: d,
					hostBindingOpCodes: null,
					firstCreatePass: !0,
					firstUpdatePass: !0,
					staticViewQueries: !1,
					staticContentQueries: !1,
					preOrderHooks: null,
					preOrderCheckHooks: null,
					contentHooks: null,
					contentCheckHooks: null,
					viewHooks: null,
					viewCheckHooks: null,
					destroyHooks: null,
					cleanup: null,
					contentQueries: null,
					components: null,
					directiveRegistry: "function" == typeof s ? s() : s,
					pipeRegistry: "function" == typeof o ? o() : o,
					firstChild: null,
					schemas: l,
					consts: h,
					incompleteFirstPass: !1
				}
			}

			function C_(t, n, e, r) {
				const i = R_(n);
				null === e ? i.push(r) : (i.push(e), t.firstCreatePass && O_(t).push(r, i.length - 1))
			}

			function D_(t, n, e) {
				for (let r in t)
					if (t.hasOwnProperty(r)) {
						const i = t[r];
						(e = null === e ? {} : e).hasOwnProperty(r) ? e[r].push(n, i) : e[r] = [n, i]
					} return e
			}

			function x_(t, n) {
				const r = n.directiveEnd,
					i = t.data,
					s = n.attrs,
					o = [];
				let a = null,
					l = null;
				for (let u = n.directiveStart; u < r; u++) {
					const c = i[u],
						d = c.inputs,
						f = null === s || qy(n) ? null : mF(d, s);
					o.push(f), a = D_(d, u, a), l = D_(c.outputs, u, l)
				}
				null !== a && (a.hasOwnProperty("class") && (n.flags |= 16), a.hasOwnProperty("style") && (n.flags |= 32)), n.initialInputs = o, n.inputs = a, n.outputs = l
			}

			function $t(t, n, e, r, i, s, o, a) {
				const l = rn(n, e);
				let c, u = n.inputs;
				!a && null != u && (c = u[r]) ? (af(t, e, c, r, i), Aa(n) && E_(e, n.index)) : 3 & n.type && (r = function sF(t) {
					return "class" === t ? "className" : "for" === t ? "htmlFor" : "formaction" === t ? "formAction" : "innerHtml" === t ? "innerHTML" : "readonly" === t ? "readOnly" : "tabindex" === t ? "tabIndex" : t
				}(r), i = null != o ? o(i, n.value || "", r) : i, s.setProperty(l, r, i))
			}

			function E_(t, n) {
				const e = Vt(n, t);
				16 & e[2] || (e[2] |= 32)
			}

			function ef(t, n, e, r) {
				let i = !1;
				if (lm()) {
					const s = function dF(t, n, e) {
							const r = t.directiveRegistry;
							let i = null;
							if (r)
								for (let s = 0; s < r.length; s++) {
									const o = r[s];
									Ky(e, o.selectors, !1) && (i || (i = []), Va(zs(e, n), t, o.type), _n(o) ? (S_(t, e), i.unshift(o)) : i.push(o))
								}
							return i
						}(t, n, e),
						o = null === r ? null : {
							"": -1
						};
					if (null !== s) {
						i = !0, I_(e, t.data.length, s.length);
						for (let c = 0; c < s.length; c++) {
							const d = s[c];
							d.providersResolver && d.providersResolver(d)
						}
						let a = !1,
							l = !1,
							u = Xi(t, n, s.length, null);
						for (let c = 0; c < s.length; c++) {
							const d = s[c];
							e.mergedAttrs = Na(e.mergedAttrs, d.hostAttrs), T_(t, e, n, u, d), hF(u, d, o), null !== d.contentQueries && (e.flags |= 8), (null !== d.hostBindings || null !== d.hostAttrs || 0 !== d.hostVars) && (e.flags |= 128);
							const f = d.type.prototype;
							!a && (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) && ((t.preOrderHooks || (t.preOrderHooks = [])).push(e.index), a = !0), !l && (f.ngOnChanges || f.ngDoCheck) && ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(e.index), l = !0), u++
						}
						x_(t, e)
					}
					o && function fF(t, n, e) {
						if (n) {
							const r = t.localNames = [];
							for (let i = 0; i < n.length; i += 2) {
								const s = e[n[i + 1]];
								if (null == s) throw new w(-301, !1);
								r.push(n[i], s)
							}
						}
					}(e, r, o)
				}
				return e.mergedAttrs = Na(e.mergedAttrs, e.attrs), i
			}

			function M_(t, n, e, r, i, s) {
				const o = s.hostBindings;
				if (o) {
					let a = t.hostBindingOpCodes;
					null === a && (a = t.hostBindingOpCodes = []);
					const l = ~n.index;
					(function lF(t) {
						let n = t.length;
						for (; n > 0;) {
							const e = t[--n];
							if ("number" == typeof e && e < 0) return e
						}
						return 0
					})(a) != l && a.push(l), a.push(r, i, o)
				}
			}

			function A_(t, n) {
				null !== t.hostBindings && t.hostBindings(1, n)
			}

			function S_(t, n) {
				n.flags |= 2, (t.components || (t.components = [])).push(n.index)
			}

			function hF(t, n, e) {
				if (e) {
					if (n.exportAs)
						for (let r = 0; r < n.exportAs.length; r++) e[n.exportAs[r]] = t;
					_n(n) && (e[""] = t)
				}
			}

			function I_(t, n, e) {
				t.flags |= 1, t.directiveStart = n, t.directiveEnd = n + e, t.providerIndexes = n
			}

			function T_(t, n, e, r, i) {
				t.data[r] = i;
				const s = i.factory || (i.factory = Yr(i.type)),
					o = new Us(s, _n(i), p);
				t.blueprint[r] = o, e[r] = o, M_(t, n, 0, r, Xi(t, e, i.hostVars, z), i)
			}

			function pF(t, n, e) {
				const r = rn(n, t),
					i = w_(e),
					s = t[10],
					o = ol(t, il(t, i, null, e.onPush ? 32 : 16, r, n, s, s.createRenderer(r, e), null, null, null));
				t[n.index] = o
			}

			function Nn(t, n, e, r, i, s) {
				const o = rn(t, n);
				! function tf(t, n, e, r, i, s, o) {
					if (null == s) t.removeAttribute(n, i, e);
					else {
						const a = null == o ? G(s) : o(s, r || "", i);
						t.setAttribute(n, i, a, e)
					}
				}(n[Q], o, s, t.value, e, r, i)
			}

			function gF(t, n, e, r, i, s) {
				const o = s[n];
				if (null !== o) {
					const a = r.setInput;
					for (let l = 0; l < o.length;) {
						const u = o[l++],
							c = o[l++],
							d = o[l++];
						null !== a ? r.setInput(e, d, u, c) : e[c] = d
					}
				}
			}

			function mF(t, n) {
				let e = null,
					r = 0;
				for (; r < n.length;) {
					const i = n[r];
					if (0 !== i)
						if (5 !== i) {
							if ("number" == typeof i) break;
							t.hasOwnProperty(i) && (null === e && (e = []), e.push(i, t[i], n[r + 1])), r += 2
						} else r += 2;
					else r += 4
				}
				return e
			}

			function F_(t, n, e, r) {
				return new Array(t, !0, !1, n, null, 0, r, e, null, null)
			}

			function vF(t, n) {
				const e = Vt(n, t);
				if (Ta(e)) {
					const r = e[1];
					48 & e[2] ? sl(r, e, r.template, e[8]) : e[5] > 0 && nf(e)
				}
			}

			function nf(t) {
				for (let r = xd(t); null !== r; r = Ed(r))
					for (let i = 10; i < r.length; i++) {
						const s = r[i];
						if (Ta(s))
							if (512 & s[2]) {
								const o = s[1];
								sl(o, s, o.template, s[8])
							} else s[5] > 0 && nf(s)
					}
				const e = t[1].components;
				if (null !== e)
					for (let r = 0; r < e.length; r++) {
						const i = Vt(e[r], t);
						Ta(i) && i[5] > 0 && nf(i)
					}
			}

			function bF(t, n) {
				const e = Vt(n, t),
					r = e[1];
				(function wF(t, n) {
					for (let e = n.length; e < t.blueprint.length; e++) n.push(t.blueprint[e])
				})(r, e), Yd(r, e, e[8])
			}

			function ol(t, n) {
				return t[13] ? t[14][4] = n : t[13] = n, t[14] = n, n
			}

			function rf(t) {
				for (; t;) {
					t[2] |= 32;
					const n = oo(t);
					if (f0(t) && !n) return t;
					t = n
				}
				return null
			}

			function al(t, n, e, r = !0) {
				const i = n[10];
				i.begin && i.begin();
				try {
					sl(t, n, t.template, e)
				} catch (o) {
					throw r && N_(n, o), o
				} finally {
					i.end && i.end()
				}
			}

			function sf(t, n, e) {
				Pc(0), n(t, e)
			}

			function R_(t) {
				return t[7] || (t[7] = [])
			}

			function O_(t) {
				return t.cleanup || (t.cleanup = [])
			}

			function N_(t, n) {
				const e = t[9],
					r = e ? e.get(er, null) : null;
				r && r.handleError(n)
			}

			function af(t, n, e, r, i) {
				for (let s = 0; s < e.length;) {
					const o = e[s++],
						a = e[s++],
						l = n[o],
						u = t.data[o];
					null !== u.setInput ? u.setInput(l, i, r, a) : l[a] = i
				}
			}

			function ll(t, n, e) {
				let r = e ? t.styles : null,
					i = e ? t.classes : null,
					s = 0;
				if (null !== n)
					for (let o = 0; o < n.length; o++) {
						const a = n[o];
						"number" == typeof a ? s = a : 1 == s ? i = mc(i, a) : 2 == s && (r = mc(r, a + ": " + n[++o] + ";"))
					}
				e ? t.styles = r : t.stylesWithoutHost = r, e ? t.classes = i : t.classesWithoutHost = i
			}

			function ul(t, n, e, r, i = !1) {
				for (; null !== e;) {
					const s = n[e.index];
					if (null !== s && r.push(Ue(s)), yn(s))
						for (let a = 10; a < s.length; a++) {
							const l = s[a],
								u = l[1].firstChild;
							null !== u && ul(l[1], l, u, r)
						}
					const o = e.type;
					if (8 & o) ul(t, n, e.child, r);
					else if (32 & o) {
						const a = Dd(e, n);
						let l;
						for (; l = a();) r.push(l)
					} else if (16 & o) {
						const a = jy(n, e);
						if (Array.isArray(a)) r.push(...a);
						else {
							const l = oo(n[16]);
							ul(l[1], l, a, r, !0)
						}
					}
					e = i ? e.projectionNext : e.next
				}
				return r
			}
			class lo {
				constructor(n, e) {
					this._lView = n, this._cdRefInjectingView = e, this._appRef = null, this._attachedToViewContainer = !1
				}
				get rootNodes() {
					const n = this._lView,
						e = n[1];
					return ul(e, n, e.firstChild, [])
				}
				get context() {
					return this._lView[8]
				}
				set context(n) {
					this._lView[8] = n
				}
				get destroyed() {
					return 128 == (128 & this._lView[2])
				}
				destroy() {
					if (this._appRef) this._appRef.detachView(this);
					else if (this._attachedToViewContainer) {
						const n = this._lView[3];
						if (yn(n)) {
							const e = n[8],
								r = e ? e.indexOf(this) : -1;
							r > -1 && (Sd(n, r), Ha(e, r))
						}
						this._attachedToViewContainer = !1
					}
					Ry(this._lView[1], this._lView)
				}
				onDestroy(n) {
					C_(this._lView[1], this._lView, null, n)
				}
				markForCheck() {
					rf(this._cdRefInjectingView || this._lView)
				}
				detach() {
					this._lView[2] &= -65
				}
				reattach() {
					this._lView[2] |= 64
				}
				detectChanges() {
					al(this._lView[1], this._lView, this.context)
				}
				checkNoChanges() {}
				attachToViewContainerRef() {
					if (this._appRef) throw new w(902, !1);
					this._attachedToViewContainer = !0
				}
				detachFromAppRef() {
					this._appRef = null,
						function rT(t, n) {
							ao(t, n, n[Q], 2, null, null)
						}(this._lView[1], this._lView)
				}
				attachToAppRef(n) {
					if (this._attachedToViewContainer) throw new w(902, !1);
					this._appRef = n
				}
			}
			class CF extends lo {
				constructor(n) {
					super(n), this._view = n
				}
				detectChanges() {
					const n = this._view;
					al(n[1], n, n[8], !1)
				}
				checkNoChanges() {}
				get context() {
					return null
				}
			}
			class lf extends ro {
				constructor(n) {
					super(), this.ngModule = n
				}
				resolveComponentFactory(n) {
					const e = fe(n);
					return new uo(e, this.ngModule)
				}
			}

			function L_(t) {
				const n = [];
				for (let e in t) t.hasOwnProperty(e) && n.push({
					propName: t[e],
					templateName: e
				});
				return n
			}
			class xF {
				constructor(n, e) {
					this.injector = n, this.parentInjector = e
				}
				get(n, e, r) {
					const i = this.injector.get(n, hd, r);
					return i !== hd || e === hd ? i : this.parentInjector.get(n, e, r)
				}
			}
			class uo extends py {
				constructor(n, e) {
					super(), this.componentDef = n, this.ngModule = e, this.componentType = n.type, this.selector = function DT(t) {
						return t.map(CT).join(",")
					}(n.selectors), this.ngContentSelectors = n.ngContentSelectors ? n.ngContentSelectors : [], this.isBoundToModule = !!e
				}
				get inputs() {
					return L_(this.componentDef.inputs)
				}
				get outputs() {
					return L_(this.componentDef.outputs)
				}
				create(n, e, r, i) {
					let s = (i = i || this.ngModule) instanceof Mr ? i : i?.injector;
					s && null !== this.componentDef.getStandaloneInjector && (s = this.componentDef.getStandaloneInjector(s) || s);
					const o = s ? new xF(n, s) : n,
						a = o.get(io, null);
					if (null === a) throw new w(407, !1);
					const l = o.get(wI, null),
						u = a.createRenderer(null, this.componentDef),
						c = this.componentDef.selectors[0][0] || "div",
						d = r ? function rF(t, n, e) {
							return t.selectRootElement(n, e === gn.ShadowDom)
						}(u, r, this.componentDef.encapsulation) : Ad(a.createRenderer(null, this.componentDef), c, function DF(t) {
							const n = t.toLowerCase();
							return "svg" === n ? "svg" : "math" === n ? "math" : null
						}(c)),
						f = this.componentDef.onPush ? 288 : 272,
						h = Jd(0, null, null, 1, 0, null, null, null, null, null),
						g = il(null, h, null, f, null, null, a, u, l, o, null);
					let m, _;
					Vc(g);
					try {
						const y = function AF(t, n, e, r, i, s) {
							const o = e[1];
							e[22] = t;
							const l = Zi(o, 22, 2, "#host", null),
								u = l.mergedAttrs = n.hostAttrs;
							null !== u && (ll(l, u, !0), null !== t && (ka(i, t, u), null !== l.classes && Od(i, t, l.classes), null !== l.styles && Gy(i, t, l.styles)));
							const c = r.createRenderer(t, n),
								d = il(e, w_(n), null, n.onPush ? 32 : 16, e[22], l, r, c, s || null, null, null);
							return o.firstCreatePass && (Va(zs(l, e), o, n.type), S_(o, l), I_(l, e.length, 1)), ol(e, d), e[22] = d
						}(d, this.componentDef, g, a, u);
						if (d)
							if (r) ka(u, d, ["ng-version", CI.full]);
							else {
								const {
									attrs: C,
									classes: v
								} = function xT(t) {
									const n = [],
										e = [];
									let r = 1,
										i = 2;
									for (; r < t.length;) {
										let s = t[r];
										if ("string" == typeof s) 2 === i ? "" !== s && n.push(s, t[++r]) : 8 === i && e.push(s);
										else {
											if (!bn(i)) break;
											i = s
										}
										r++
									}
									return {
										attrs: n,
										classes: e
									}
								}(this.componentDef.selectors[0]);
								C && ka(u, d, C), v && v.length > 0 && Od(u, d, v.join(" "))
							} if (_ = Ic(h, 22), void 0 !== e) {
							const C = _.projection = [];
							for (let v = 0; v < this.ngContentSelectors.length; v++) {
								const I = e[v];
								C.push(null != I ? Array.from(I) : null)
							}
						}
						m = function SF(t, n, e, r) {
							const i = e[1],
								s = function aF(t, n, e) {
									const r = Ke();
									t.firstCreatePass && (e.providersResolver && e.providersResolver(e), T_(t, r, n, Xi(t, n, 1, null), e), x_(t, r));
									const i = Ws(n, t, r.directiveStart, r);
									lt(i, n);
									const s = rn(r, n);
									return s && lt(s, n), i
								}(i, e, n);
							if (t[8] = e[8] = s, null !== r)
								for (const a of r) a(s, n);
							if (n.contentQueries) {
								const a = Ke();
								n.contentQueries(1, s, a.directiveStart)
							}
							const o = Ke();
							return !i.firstCreatePass || null === n.hostBindings && null === n.hostAttrs || (Dr(o.index), M_(e[1], o, 0, o.directiveStart, o.directiveEnd, n), A_(n, s)), s
						}(y, this.componentDef, g, [IF]), Yd(h, g, null)
					} finally {
						Bc()
					}
					return new MF(this.componentType, m, qi(_, g), g, _)
				}
			}
			class MF extends class gI {} {
				constructor(n, e, r, i, s) {
					super(), this.location = r, this._rootLView = i, this._tNode = s, this.instance = e, this.hostView = this.changeDetectorRef = new CF(i), this.componentType = n
				}
				setInput(n, e) {
					const r = this._tNode.inputs;
					let i;
					if (null !== r && (i = r[n])) {
						const s = this._rootLView;
						af(s[1], s, i, n, e), E_(s, this._tNode.index)
					}
				}
				get injector() {
					return new Ni(this._tNode, this._rootLView)
				}
				destroy() {
					this.hostView.destroy()
				}
				onDestroy(n) {
					this.hostView.onDestroy(n)
				}
			}

			function IF() {
				const t = Ke();
				Fa(D()[1], t)
			}

			function M(t) {
				let n = function P_(t) {
						return Object.getPrototypeOf(t.prototype).constructor
					}(t.type),
					e = !0;
				const r = [t];
				for (; n;) {
					let i;
					if (_n(t)) i = n.\u0275cmp || n.\u0275dir;
					else {
						if (n.\u0275cmp) throw new w(903, !1);
						i = n.\u0275dir
					}
					if (i) {
						if (e) {
							r.push(i);
							const o = t;
							o.inputs = uf(t.inputs), o.declaredInputs = uf(t.declaredInputs), o.outputs = uf(t.outputs);
							const a = i.hostBindings;
							a && OF(t, a);
							const l = i.viewQuery,
								u = i.contentQueries;
							if (l && FF(t, l), u && RF(t, u), gc(t.inputs, i.inputs), gc(t.declaredInputs, i.declaredInputs), gc(t.outputs, i.outputs), _n(i) && i.data.animation) {
								const c = t.data;
								c.animation = (c.animation || []).concat(i.data.animation)
							}
						}
						const s = i.features;
						if (s)
							for (let o = 0; o < s.length; o++) {
								const a = s[o];
								a && a.ngInherit && a(t), a === M && (e = !1)
							}
					}
					n = Object.getPrototypeOf(n)
				}! function TF(t) {
					let n = 0,
						e = null;
					for (let r = t.length - 1; r >= 0; r--) {
						const i = t[r];
						i.hostVars = n += i.hostVars, i.hostAttrs = Na(i.hostAttrs, e = Na(e, i.hostAttrs))
					}
				}(r)
			}

			function uf(t) {
				return t === Mi ? {} : t === le ? [] : t
			}

			function FF(t, n) {
				const e = t.viewQuery;
				t.viewQuery = e ? (r, i) => {
					n(r, i), e(r, i)
				} : n
			}

			function RF(t, n) {
				const e = t.contentQueries;
				t.contentQueries = e ? (r, i, s) => {
					n(r, i, s), e(r, i, s)
				} : n
			}

			function OF(t, n) {
				const e = t.hostBindings;
				t.hostBindings = e ? (r, i) => {
					n(r, i), e(r, i)
				} : n
			}
			let cl = null;

			function ei() {
				if (!cl) {
					const t = _e.Symbol;
					if (t && t.iterator) cl = t.iterator;
					else {
						const n = Object.getOwnPropertyNames(Map.prototype);
						for (let e = 0; e < n.length; ++e) {
							const r = n[e];
							"entries" !== r && "size" !== r && Map.prototype[r] === Map.prototype.entries && (cl = r)
						}
					}
				}
				return cl
			}

			function ut(t, n, e) {
				return !Object.is(t[n], e) && (t[n] = e, !0)
			}

			function Tt(t, n, e, r) {
				const i = D();
				return ut(i, Ri(), n) && (te(), Nn(Ne(), i, t, n, e, r)), Tt
			}

			function on(t, n, e, r, i, s, o, a) {
				const l = D(),
					u = te(),
					c = t + 22,
					d = u.firstCreatePass ? function jF(t, n, e, r, i, s, o, a, l) {
						const u = n.consts,
							c = Zi(n, t, 4, o || null, Cr(u, a));
						ef(n, e, c, Cr(u, l)), Fa(n, c);
						const d = c.tViews = Jd(2, c, r, i, s, n.directiveRegistry, n.pipeRegistry, null, n.schemas, u);
						return null !== n.queries && (n.queries.template(n, c), d.queries = n.queries.embeddedTView(c)), c
					}(c, u, l, n, e, r, i, s, o) : u.data[c];
				Rn(d, !1);
				const f = l[Q].createComment("");
				Xa(u, l, f, d), lt(f, l), ol(l, l[c] = F_(f, l, f, d)), Sa(d) && Zd(u, l, d), null != o && Xd(l, d, a)
			}

			function df(t) {
				return function Fi(t, n) {
					return t[n]
				}(function F0() {
					return $.lFrame.contextLView
				}(), 22 + t)
			}

			function Be(t, n, e) {
				const r = D();
				return ut(r, Ri(), n) && $t(te(), Ne(), r, t, n, r[Q], e, !1), Be
			}

			function ff(t, n, e, r, i) {
				const o = i ? "class" : "style";
				af(t, e, n.inputs[o], o, r)
			}

			function me(t, n, e, r) {
				const i = D(),
					s = te(),
					o = 22 + t,
					a = i[Q],
					l = i[o] = Ad(a, n, function $0() {
						return $.lFrame.currentNamespace
					}()),
					u = s.firstCreatePass ? function UF(t, n, e, r, i, s, o) {
						const a = n.consts,
							u = Zi(n, t, 2, i, Cr(a, s));
						return ef(n, e, u, Cr(a, o)), null !== u.attrs && ll(u, u.attrs, !1), null !== u.mergedAttrs && ll(u, u.mergedAttrs, !0), null !== n.queries && n.queries.elementStart(n, u), u
					}(o, s, i, 0, n, e, r) : s.data[o];
				Rn(u, !0);
				const c = u.mergedAttrs;
				null !== c && ka(a, l, c);
				const d = u.classes;
				null !== d && Od(a, l, d);
				const f = u.styles;
				return null !== f && Gy(a, l, f), 64 != (64 & u.flags) && Xa(s, i, l, u), 0 === function M0() {
						return $.lFrame.elementDepthCount
					}() && lt(l, i),
					function A0() {
						$.lFrame.elementDepthCount++
					}(), Sa(u) && (Zd(s, i, u), b_(s, u, i)), null !== r && Xd(i, u), me
			}

			function De() {
				let t = Ke();
				Oc() ? kc() : (t = t.parent, Rn(t, !1));
				const n = t;
				! function S0() {
					$.lFrame.elementDepthCount--
				}();
				const e = te();
				return e.firstCreatePass && (Fa(e, t), xc(t) && e.queries.elementEnd(t)), null != n.classesWithoutHost && function q0(t) {
					return 0 != (16 & t.flags)
				}(n) && ff(e, n, D(), n.classesWithoutHost, !0), null != n.stylesWithoutHost && function K0(t) {
					return 0 != (32 & t.flags)
				}(n) && ff(e, n, D(), n.stylesWithoutHost, !1), De
			}

			function bt(t, n, e, r) {
				return me(t, n, e, r), De(), bt
			}

			function ho(t, n, e) {
				const r = D(),
					i = te(),
					s = t + 22,
					o = i.firstCreatePass ? function GF(t, n, e, r, i) {
						const s = n.consts,
							o = Cr(s, r),
							a = Zi(n, t, 8, "ng-container", o);
						return null !== o && ll(a, o, !0), ef(n, e, a, Cr(s, i)), null !== n.queries && n.queries.elementStart(n, a), a
					}(s, i, r, n, e) : i.data[s];
				Rn(o, !0);
				const a = r[s] = r[Q].createComment("");
				return Xa(i, r, a, o), lt(a, r), Sa(o) && (Zd(i, r, o), b_(i, o, r)), null != e && Xd(r, o), ho
			}

			function po() {
				let t = Ke();
				const n = te();
				return Oc() ? kc() : (t = t.parent, Rn(t, !1)), n.firstCreatePass && (Fa(n, t), xc(t) && n.queries.elementEnd(t)), po
			}

			function hf() {
				return D()
			}

			function go(t) {
				return !!t && "function" == typeof t.then
			}
			const pf = function K_(t) {
				return !!t && "function" == typeof t.subscribe
			};

			function Ze(t, n, e, r) {
				const i = D(),
					s = te(),
					o = Ke();
				return function Y_(t, n, e, r, i, s, o, a) {
					const l = Sa(r),
						c = t.firstCreatePass && O_(t),
						d = n[8],
						f = R_(n);
					let h = !0;
					if (3 & r.type || a) {
						const _ = rn(r, n),
							y = a ? a(_) : _,
							C = f.length,
							v = a ? K => a(Ue(K[r.index])) : r.index;
						let I = null;
						if (!a && l && (I = function zF(t, n, e, r) {
								const i = t.cleanup;
								if (null != i)
									for (let s = 0; s < i.length - 1; s += 2) {
										const o = i[s];
										if (o === e && i[s + 1] === r) {
											const a = n[7],
												l = i[s + 2];
											return a.length > l ? a[l] : null
										}
										"string" == typeof o && (s += 2)
									}
								return null
							}(t, n, i, r.index)), null !== I)(I.__ngLastListenerFn__ || I).__ngNextListenerFn__ = s, I.__ngLastListenerFn__ = s, h = !1;
						else {
							s = X_(r, n, d, s, !1);
							const K = e.listen(y, i, s);
							f.push(s, K), c && c.push(i, v, C, C + 1)
						}
					} else s = X_(r, n, d, s, !1);
					const g = r.outputs;
					let m;
					if (h && null !== g && (m = g[i])) {
						const _ = m.length;
						if (_)
							for (let y = 0; y < _; y += 2) {
								const ee = n[m[y]][m[y + 1]].subscribe(s),
									Te = f.length;
								f.push(s, ee), c && c.push(i, r.index, Te, -(Te + 1))
							}
					}
				}(s, i, i[Q], o, t, n, 0, r), Ze
			}

			function Z_(t, n, e, r) {
				try {
					return !1 !== e(r)
				} catch (i) {
					return N_(t, i), !1
				}
			}

			function X_(t, n, e, r, i) {
				return function s(o) {
					if (o === Function) return r;
					rf(2 & t.flags ? Vt(t.index, n) : n);
					let l = Z_(n, 0, r, o),
						u = s.__ngNextListenerFn__;
					for (; u;) l = Z_(n, 0, u, o) && l, u = u.__ngNextListenerFn__;
					return i && !1 === l && (o.preventDefault(), o.returnValue = !1), l
				}
			}

			function Pn(t = 1) {
				return function L0(t) {
					return ($.lFrame.contextLView = function P0(t, n) {
						for (; t > 0;) n = n[15], t--;
						return n
					}(t, $.lFrame.contextLView))[8]
				}(t)
			}

			function WF(t, n) {
				let e = null;
				const r = function _T(t) {
					const n = t.attrs;
					if (null != n) {
						const e = n.indexOf(5);
						if (0 == (1 & e)) return n[e + 1]
					}
					return null
				}(t);
				for (let i = 0; i < n.length; i++) {
					const s = n[i];
					if ("*" !== s) {
						if (null === r ? Ky(t, s, !0) : wT(r, s)) return i
					} else e = i
				}
				return e
			}

			function ls(t) {
				const n = D()[16][6];
				if (!n.projection) {
					const r = n.projection = Qs(t ? t.length : 1, null),
						i = r.slice();
					let s = n.child;
					for (; null !== s;) {
						const o = t ? WF(s, t) : 0;
						null !== o && (i[o] ? i[o].projectionNext = s : r[o] = s, i[o] = s), s = s.next
					}
				}
			}

			function wt(t, n = 0, e) {
				const r = D(),
					i = te(),
					s = Zi(i, 22 + t, 16, null, e || null);
				null === s.projection && (s.projection = n), kc(), 64 != (64 & s.flags) && function dT(t, n, e) {
					Uy(n[Q], 0, n, e, Oy(t, e, n), Py(e.parent || n[6], e, n))
				}(i, r, s)
			}

			function lv(t, n, e, r, i) {
				const s = t[e + 1],
					o = null === n;
				let a = r ? wn(s) : nr(s),
					l = !1;
				for (; 0 !== a && (!1 === l || o);) {
					const c = t[a + 1];
					QF(t[a], n) && (l = !0, t[a + 1] = r ? jd(c) : Bd(c)), a = r ? wn(c) : nr(c)
				}
				l && (t[e + 1] = r ? Bd(s) : jd(s))
			}

			function QF(t, n) {
				return null === t || null == n || (Array.isArray(t) ? t[1] : t) === n || !(!Array.isArray(t) || "string" != typeof n) && ji(t, n) >= 0
			}

			function Ft(t, n) {
				return function Cn(t, n, e, r) {
					const i = D(),
						s = te(),
						o = function Zn(t) {
							const n = $.lFrame,
								e = n.bindingIndex;
							return n.bindingIndex = n.bindingIndex + t, e
						}(2);
					s.firstUpdatePass && function yv(t, n, e, r) {
						const i = t.data;
						if (null === i[e + 1]) {
							const s = i[_t()],
								o = function mv(t, n) {
									return n >= t.expandoStartIndex
								}(t, e);
							(function wv(t, n) {
								return 0 != (t.flags & (n ? 16 : 32))
							})(s, r) && null === n && !o && (n = !1), n = function iR(t, n, e, r) {
									const i = function Lc(t) {
										const n = $.lFrame.currentDirectiveIndex;
										return -1 === n ? null : t[n]
									}(t);
									let s = r ? n.residualClasses : n.residualStyles;
									if (null === i) 0 === (r ? n.classBindings : n.styleBindings) && (e = mo(e = mf(null, t, n, e, r), n.attrs, r), s = null);
									else {
										const o = n.directiveStylingLast;
										if (-1 === o || t[o] !== i)
											if (e = mf(i, t, n, e, r), null === s) {
												let l = function sR(t, n, e) {
													const r = e ? n.classBindings : n.styleBindings;
													if (0 !== nr(r)) return t[wn(r)]
												}(t, n, r);
												void 0 !== l && Array.isArray(l) && (l = mf(null, t, n, l[1], r), l = mo(l, n.attrs, r), function oR(t, n, e, r) {
													t[wn(e ? n.classBindings : n.styleBindings)] = r
												}(t, n, r, l))
											} else s = function aR(t, n, e) {
												let r;
												const i = n.directiveEnd;
												for (let s = 1 + n.directiveStylingLast; s < i; s++) r = mo(r, t[s].hostAttrs, e);
												return mo(r, n.attrs, e)
											}(t, n, r)
									}
									return void 0 !== s && (r ? n.residualClasses = s : n.residualStyles = s), e
								}(i, s, n, r),
								function qF(t, n, e, r, i, s) {
									let o = s ? n.classBindings : n.styleBindings,
										a = wn(o),
										l = nr(o);
									t[r] = e;
									let c, u = !1;
									if (Array.isArray(e)) {
										const d = e;
										c = d[1], (null === c || ji(d, c) > 0) && (u = !0)
									} else c = e;
									if (i)
										if (0 !== l) {
											const f = wn(t[a + 1]);
											t[r + 1] = tl(f, a), 0 !== f && (t[f + 1] = Hd(t[f + 1], r)), t[a + 1] = function UT(t, n) {
												return 131071 & t | n << 17
											}(t[a + 1], r)
										} else t[r + 1] = tl(a, 0), 0 !== a && (t[a + 1] = Hd(t[a + 1], r)), a = r;
									else t[r + 1] = tl(l, 0), 0 === a ? a = r : t[l + 1] = Hd(t[l + 1], r), l = r;
									u && (t[r + 1] = Bd(t[r + 1])), lv(t, c, r, !0), lv(t, c, r, !1),
										function KF(t, n, e, r, i) {
											const s = i ? t.residualClasses : t.residualStyles;
											null != s && "string" == typeof n && ji(s, n) >= 0 && (e[r + 1] = jd(e[r + 1]))
										}(n, c, t, r, s), o = tl(a, l), s ? n.classBindings = o : n.styleBindings = o
								}(i, s, n, e, o, r)
						}
					}(s, t, o, r), n !== z && ut(i, o, n) && function vv(t, n, e, r, i, s, o, a) {
						if (!(3 & n.type)) return;
						const l = t.data,
							u = l[a + 1];
						fl(function c_(t) {
							return 1 == (1 & t)
						}(u) ? bv(l, n, e, i, nr(u), o) : void 0) || (fl(s) || function u_(t) {
							return 2 == (2 & t)
						}(u) && (s = bv(l, null, e, i, a, o)), function hT(t, n, e, r, i) {
							if (n) i ? t.addClass(e, r) : t.removeClass(e, r);
							else {
								let s = -1 === r.indexOf("-") ? void 0 : St.DashCase;
								null == i ? t.removeStyle(e, r, s) : ("string" == typeof i && i.endsWith("!important") && (i = i.slice(0, -10), s |= St.Important), t.setStyle(e, r, i, s))
							}
						}(r, o, Ia(_t(), e), i, s))
					}(s, s.data[_t()], i, i[Q], t, i[o + 1] = function cR(t, n) {
						return null == t || ("string" == typeof n ? t += n : "object" == typeof t && (t = pe(jt(t)))), t
					}(n, e), r, o)
				}(t, n, null, !0), Ft
			}

			function mf(t, n, e, r, i) {
				let s = null;
				const o = e.directiveEnd;
				let a = e.directiveStylingLast;
				for (-1 === a ? a = e.directiveStart : a++; a < o && (s = n[a], r = mo(r, s.hostAttrs, i), s !== t);) a++;
				return null !== t && (e.directiveStylingLast = a), r
			}

			function mo(t, n, e) {
				const r = e ? 1 : 2;
				let i = -1;
				if (null !== n)
					for (let s = 0; s < n.length; s++) {
						const o = n[s];
						"number" == typeof o ? i = o : i === r && (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]), Ht(t, o, !!e || n[++s]))
					}
				return void 0 === t ? null : t
			}

			function bv(t, n, e, r, i, s) {
				const o = null === n;
				let a;
				for (; i > 0;) {
					const l = t[i],
						u = Array.isArray(l),
						c = u ? l[1] : l,
						d = null === c;
					let f = e[i + 1];
					f === z && (f = d ? le : void 0);
					let h = d ? Kc(f, r) : c === r ? f : void 0;
					if (u && !fl(h) && (h = Kc(l, r)), fl(h) && (a = h, o)) return a;
					const g = t[i + 1];
					i = o ? wn(g) : nr(g)
				}
				if (null !== n) {
					let l = s ? n.residualClasses : n.residualStyles;
					null != l && (a = Kc(l, r))
				}
				return a
			}

			function fl(t) {
				return void 0 !== t
			}

			function ni(t, n = "") {
				const e = D(),
					r = te(),
					i = t + 22,
					s = r.firstCreatePass ? Zi(r, i, 1, n, null) : r.data[i],
					o = e[i] = function Md(t, n) {
						return t.createText(n)
					}(e[Q], n);
				Xa(r, e, o, s), Rn(s, !1)
			}

			function hl(t) {
				return pl("", t, ""), hl
			}

			function pl(t, n, e) {
				const r = D(),
					i = function es(t, n, e, r) {
						return ut(t, Ri(), e) ? n + G(e) + r : z
					}(r, t, n, e);
				return i !== z && function rr(t, n, e) {
					const r = Ia(n, t);
					! function Ty(t, n, e) {
						t.setValue(n, e)
					}(t[Q], r, e)
				}(r, _t(), i), pl
			}

			function yf(t, n, e) {
				const r = D();
				return ut(r, Ri(), n) && $t(te(), Ne(), r, t, n, r[Q], e, !0), yf
			}
			const ds = "en-US";
			let $v = ds;

			function bf(t, n, e, r, i) {
				if (t = H(t), Array.isArray(t))
					for (let s = 0; s < t.length; s++) bf(t[s], n, e, r, i);
				else {
					const s = te(),
						o = D();
					let a = Xr(t) ? t : H(t.provide),
						l = hy(t);
					const u = Ke(),
						c = 1048575 & u.providerIndexes,
						d = u.directiveStart,
						f = u.providerIndexes >> 20;
					if (Xr(t) || !t.multi) {
						const h = new Us(l, i, p),
							g = Cf(a, n, i ? c : c + f, d); - 1 === g ? (Va(zs(u, o), s, a), wf(s, t, n.length), n.push(a), u.directiveStart++, u.directiveEnd++, i && (u.providerIndexes += 1048576), e.push(h), o.push(h)) : (e[g] = h, o[g] = h)
					} else {
						const h = Cf(a, n, c + f, d),
							g = Cf(a, n, c, c + f),
							m = h >= 0 && e[h],
							_ = g >= 0 && e[g];
						if (i && !_ || !i && !m) {
							Va(zs(u, o), s, a);
							const y = function SO(t, n, e, r, i) {
								const s = new Us(t, e, p);
								return s.multi = [], s.index = n, s.componentProviders = 0, hb(s, i, r && !e), s
							}(i ? AO : MO, e.length, i, r, l);
							!i && _ && (e[g].providerFactory = y), wf(s, t, n.length, 0), n.push(a), u.directiveStart++, u.directiveEnd++, i && (u.providerIndexes += 1048576), e.push(y), o.push(y)
						} else wf(s, t, h > -1 ? h : g, hb(e[i ? g : h], l, !i && r));
						!i && r && _ && e[g].componentProviders++
					}
				}
			}

			function wf(t, n, e, r) {
				const i = Xr(n),
					s = function aI(t) {
						return !!t.useClass
					}(n);
				if (i || s) {
					const l = (s ? H(n.useClass) : n).prototype.ngOnDestroy;
					if (l) {
						const u = t.destroyHooks || (t.destroyHooks = []);
						if (!i && n.multi) {
							const c = u.indexOf(e); - 1 === c ? u.push(e, [r, l]) : u[c + 1].push(r, l)
						} else u.push(e, l)
					}
				}
			}

			function hb(t, n, e) {
				return e && t.componentProviders++, t.multi.push(n) - 1
			}

			function Cf(t, n, e, r) {
				for (let i = e; i < r; i++)
					if (n[i] === t) return i;
				return -1
			}

			function MO(t, n, e, r) {
				return Df(this.multi, [])
			}

			function AO(t, n, e, r) {
				const i = this.multi;
				let s;
				if (this.providerFactory) {
					const o = this.providerFactory.componentProviders,
						a = Ws(e, e[1], this.providerFactory.index, r);
					s = a.slice(0, o), Df(i, s);
					for (let l = o; l < a.length; l++) s.push(a[l])
				} else s = [], Df(i, s);
				return s
			}

			function Df(t, n) {
				for (let e = 0; e < t.length; e++) n.push((0, t[e])());
				return n
			}

			function be(t, n = []) {
				return e => {
					e.providersResolver = (r, i) => function EO(t, n, e) {
						const r = te();
						if (r.firstCreatePass) {
							const i = _n(t);
							bf(e, r.data, r.blueprint, i, !0), bf(n, r.data, r.blueprint, i, !1)
						}
					}(r, i ? i(t) : t, n)
				}
			}
			class ii {}
			class pb {}
			class gb extends ii {
				constructor(n, e) {
					super(), this._parent = e, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new lf(this);
					const r = Lt(n);
					this._bootstrapComponents = tr(r.bootstrap), this._r3Injector = t_(n, e, [{
						provide: ii,
						useValue: this
					}, {
						provide: ro,
						useValue: this.componentFactoryResolver
					}], pe(n), new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(n)
				}
				get injector() {
					return this._r3Injector
				}
				destroy() {
					const n = this._r3Injector;
					!n.destroyed && n.destroy(), this.destroyCbs.forEach(e => e()), this.destroyCbs = null
				}
				onDestroy(n) {
					this.destroyCbs.push(n)
				}
			}
			class xf extends pb {
				constructor(n) {
					super(), this.moduleType = n
				}
				create(n) {
					return new gb(this.moduleType, n)
				}
			}
			class TO extends ii {
				constructor(n, e, r) {
					super(), this.componentFactoryResolver = new lf(this), this.instance = null;
					const i = new fy([...n, {
						provide: ii,
						useValue: this
					}, {
						provide: ro,
						useValue: this.componentFactoryResolver
					}], e || Ya(), r, new Set(["environment"]));
					this.injector = i, i.resolveInjectorInitializers()
				}
				destroy() {
					this.injector.destroy()
				}
				onDestroy(n) {
					this.injector.onDestroy(n)
				}
			}

			function vl(t, n, e = null) {
				return new TO(t, n, e).injector
			}
			let FO = (() => {
				class t {
					constructor(e) {
						this._injector = e, this.cachedInjectors = new Map
					}
					getOrCreateStandaloneInjector(e) {
						if (!e.standalone) return null;
						if (!this.cachedInjectors.has(e.id)) {
							const r = ly(0, e.type),
								i = r.length > 0 ? vl([r], this._injector, `Standalone[${e.type.name}]`) : null;
							this.cachedInjectors.set(e.id, i)
						}
						return this.cachedInjectors.get(e.id)
					}
					ngOnDestroy() {
						try {
							for (const e of this.cachedInjectors.values()) null !== e && e.destroy()
						} finally {
							this.cachedInjectors.clear()
						}
					}
				}
				return t.\u0275prov = E({
					token: t,
					providedIn: "environment",
					factory: () => new t(b(Mr))
				}), t
			})();

			function mb(t) {
				t.getStandaloneInjector = n => n.get(FO).getOrCreateStandaloneInjector(t)
			}

			function Mf(t) {
				return n => {
					setTimeout(t, void 0, n)
				}
			}
			const Me = class rk extends Re {
				constructor(n = !1) {
					super(), this.__isAsync = n
				}
				emit(n) {
					super.next(n)
				}
				subscribe(n, e, r) {
					let i = n,
						s = e || (() => null),
						o = r;
					if (n && "object" == typeof n) {
						const l = n;
						i = l.next?.bind(l), s = l.error?.bind(l), o = l.complete?.bind(l)
					}
					this.__isAsync && (s = Mf(s), i && (i = Mf(i)), o && (o = Mf(o)));
					const a = super.subscribe({
						next: i,
						error: s,
						complete: o
					});
					return n instanceof Et && n.add(a), a
				}
			};

			function ik() {
				return this._results[ei()]()
			}
			class Af {
				constructor(n = !1) {
					this._emitDistinctChangesOnly = n, this.dirty = !0, this._results = [], this._changesDetected = !1, this._changes = null, this.length = 0, this.first = void 0, this.last = void 0;
					const e = ei(),
						r = Af.prototype;
					r[e] || (r[e] = ik)
				}
				get changes() {
					return this._changes || (this._changes = new Me)
				}
				get(n) {
					return this._results[n]
				}
				map(n) {
					return this._results.map(n)
				}
				filter(n) {
					return this._results.filter(n)
				}
				find(n) {
					return this._results.find(n)
				}
				reduce(n, e) {
					return this._results.reduce(n, e)
				}
				forEach(n) {
					this._results.forEach(n)
				}
				some(n) {
					return this._results.some(n)
				}
				toArray() {
					return this._results.slice()
				}
				toString() {
					return this._results.toString()
				}
				reset(n, e) {
					const r = this;
					r.dirty = !1;
					const i = Bt(n);
					(this._changesDetected = ! function iS(t, n, e) {
						if (t.length !== n.length) return !1;
						for (let r = 0; r < t.length; r++) {
							let i = t[r],
								s = n[r];
							if (e && (i = e(i), s = e(s)), s !== i) return !1
						}
						return !0
					}(r._results, i, e)) && (r._results = i, r.length = i.length, r.last = i[this.length - 1], r.first = i[0])
				}
				notifyOnChanges() {
					this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
				}
				setDirty() {
					this.dirty = !0
				}
				destroy() {
					this.changes.complete(), this.changes.unsubscribe()
				}
			}
			let ir = (() => {
				class t {}
				return t.__NG_ELEMENT_ID__ = ak, t
			})();
			const sk = ir,
				ok = class extends sk {
					constructor(n, e, r) {
						super(), this._declarationLView = n, this._declarationTContainer = e, this.elementRef = r
					}
					createEmbeddedView(n, e) {
						const r = this._declarationTContainer.tViews,
							i = il(this._declarationLView, r, n, 16, null, r.declTNode, null, null, null, null, e || null);
						i[17] = this._declarationLView[this._declarationTContainer.index];
						const o = this._declarationLView[19];
						return null !== o && (i[19] = o.createEmbeddedView(r)), Yd(r, i, n), new lo(i)
					}
				};

			function ak() {
				return bl(Ke(), D())
			}

			function bl(t, n) {
				return 4 & t.type ? new ok(n, t, qi(t, n)) : null
			}
			let xn = (() => {
				class t {}
				return t.__NG_ELEMENT_ID__ = lk, t
			})();

			function lk() {
				return Tb(Ke(), D())
			}
			const uk = xn,
				Sb = class extends uk {
					constructor(n, e, r) {
						super(), this._lContainer = n, this._hostTNode = e, this._hostLView = r
					}
					get element() {
						return qi(this._hostTNode, this._hostLView)
					}
					get injector() {
						return new Ni(this._hostTNode, this._hostLView)
					}
					get parentInjector() {
						const n = Pa(this._hostTNode, this._hostLView);
						if (Dm(n)) {
							const e = ki(n, this._hostLView),
								r = Oi(n);
							return new Ni(e[1].data[r + 8], e)
						}
						return new Ni(null, this._hostLView)
					}
					clear() {
						for (; this.length > 0;) this.remove(this.length - 1)
					}
					get(n) {
						const e = Ib(this._lContainer);
						return null !== e && e[n] || null
					}
					get length() {
						return this._lContainer.length - 10
					}
					createEmbeddedView(n, e, r) {
						let i, s;
						"number" == typeof r ? i = r : null != r && (i = r.index, s = r.injector);
						const o = n.createEmbeddedView(e || {}, s);
						return this.insert(o, i), o
					}
					createComponent(n, e, r, i, s) {
						const o = n && ! function Ks(t) {
							return "function" == typeof t
						}(n);
						let a;
						if (o) a = e;
						else {
							const d = e || {};
							a = d.index, r = d.injector, i = d.projectableNodes, s = d.environmentInjector || d.ngModuleRef
						}
						const l = o ? n : new uo(fe(n)),
							u = r || this.parentInjector;
						if (!s && null == l.ngModule) {
							const f = (o ? u : this.parentInjector).get(Mr, null);
							f && (s = f)
						}
						const c = l.create(u, i, void 0, s);
						return this.insert(c.hostView, a), c
					}
					insert(n, e) {
						const r = n._lView,
							i = r[1];
						if (function E0(t) {
								return yn(t[3])
							}(r)) {
							const c = this.indexOf(n);
							if (-1 !== c) this.detach(c);
							else {
								const d = r[3],
									f = new Sb(d, d[6], d[3]);
								f.detach(f.indexOf(n))
							}
						}
						const s = this._adjustIndex(e),
							o = this._lContainer;
						! function sT(t, n, e, r) {
							const i = 10 + r,
								s = e.length;
							r > 0 && (e[i - 1][4] = n), r < s - 10 ? (n[4] = e[i], km(e, 10 + r, n)) : (e.push(n), n[4] = null), n[3] = e;
							const o = n[17];
							null !== o && e !== o && function oT(t, n) {
								const e = t[9];
								n[16] !== n[3][3][16] && (t[2] = !0), null === e ? t[9] = [n] : e.push(n)
							}(o, n);
							const a = n[19];
							null !== a && a.insertView(t), n[2] |= 64
						}(i, r, o, s);
						const a = Fd(s, o),
							l = r[Q],
							u = Za(l, o[7]);
						return null !== u && function nT(t, n, e, r, i, s) {
							r[0] = i, r[6] = n, ao(t, r, e, 1, i, s)
						}(i, o[6], l, r, u, a), n.attachToViewContainerRef(), km(Sf(o), s, n), n
					}
					move(n, e) {
						return this.insert(n, e)
					}
					indexOf(n) {
						const e = Ib(this._lContainer);
						return null !== e ? e.indexOf(n) : -1
					}
					remove(n) {
						const e = this._adjustIndex(n, -1),
							r = Sd(this._lContainer, e);
						r && (Ha(Sf(this._lContainer), e), Ry(r[1], r))
					}
					detach(n) {
						const e = this._adjustIndex(n, -1),
							r = Sd(this._lContainer, e);
						return r && null != Ha(Sf(this._lContainer), e) ? new lo(r) : null
					}
					_adjustIndex(n, e = 0) {
						return n ?? this.length + e
					}
				};

			function Ib(t) {
				return t[8]
			}

			function Sf(t) {
				return t[8] || (t[8] = [])
			}

			function Tb(t, n) {
				let e;
				const r = n[t.index];
				if (yn(r)) e = r;
				else {
					let i;
					if (8 & t.type) i = Ue(r);
					else {
						const s = n[Q];
						i = s.createComment("");
						const o = rn(t, n);
						Jr(s, Za(s, o), i, function cT(t, n) {
							return t.nextSibling(n)
						}(s, o), !1)
					}
					n[t.index] = e = F_(r, n, i, t), ol(n, e)
				}
				return new Sb(e, t, n)
			}
			class If {
				constructor(n) {
					this.queryList = n, this.matches = null
				}
				clone() {
					return new If(this.queryList)
				}
				setDirty() {
					this.queryList.setDirty()
				}
			}
			class Tf {
				constructor(n = []) {
					this.queries = n
				}
				createEmbeddedView(n) {
					const e = n.queries;
					if (null !== e) {
						const r = null !== n.contentQueries ? n.contentQueries[0] : e.length,
							i = [];
						for (let s = 0; s < r; s++) {
							const o = e.getByIndex(s);
							i.push(this.queries[o.indexInDeclarationView].clone())
						}
						return new Tf(i)
					}
					return null
				}
				insertView(n) {
					this.dirtyQueriesWithMatches(n)
				}
				detachView(n) {
					this.dirtyQueriesWithMatches(n)
				}
				dirtyQueriesWithMatches(n) {
					for (let e = 0; e < this.queries.length; e++) null !== Nb(n, e).matches && this.queries[e].setDirty()
				}
			}
			class Fb {
				constructor(n, e, r = null) {
					this.predicate = n, this.flags = e, this.read = r
				}
			}
			class Ff {
				constructor(n = []) {
					this.queries = n
				}
				elementStart(n, e) {
					for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(n, e)
				}
				elementEnd(n) {
					for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(n)
				}
				embeddedTView(n) {
					let e = null;
					for (let r = 0; r < this.length; r++) {
						const i = null !== e ? e.length : 0,
							s = this.getByIndex(r).embeddedTView(n, i);
						s && (s.indexInDeclarationView = r, null !== e ? e.push(s) : e = [s])
					}
					return null !== e ? new Ff(e) : null
				}
				template(n, e) {
					for (let r = 0; r < this.queries.length; r++) this.queries[r].template(n, e)
				}
				getByIndex(n) {
					return this.queries[n]
				}
				get length() {
					return this.queries.length
				}
				track(n) {
					this.queries.push(n)
				}
			}
			class Rf {
				constructor(n, e = -1) {
					this.metadata = n, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = e
				}
				elementStart(n, e) {
					this.isApplyingToNode(e) && this.matchTNode(n, e)
				}
				elementEnd(n) {
					this._declarationNodeIndex === n.index && (this._appliesToNextNode = !1)
				}
				template(n, e) {
					this.elementStart(n, e)
				}
				embeddedTView(n, e) {
					return this.isApplyingToNode(n) ? (this.crossesNgTemplate = !0, this.addMatch(-n.index, e), new Rf(this.metadata)) : null
				}
				isApplyingToNode(n) {
					if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
						const e = this._declarationNodeIndex;
						let r = n.parent;
						for (; null !== r && 8 & r.type && r.index !== e;) r = r.parent;
						return e === (null !== r ? r.index : -1)
					}
					return this._appliesToNextNode
				}
				matchTNode(n, e) {
					const r = this.metadata.predicate;
					if (Array.isArray(r))
						for (let i = 0; i < r.length; i++) {
							const s = r[i];
							this.matchTNodeWithReadOption(n, e, fk(e, s)), this.matchTNodeWithReadOption(n, e, Ba(e, n, s, !1, !1))
						} else r === ir ? 4 & e.type && this.matchTNodeWithReadOption(n, e, -1) : this.matchTNodeWithReadOption(n, e, Ba(e, n, r, !1, !1))
				}
				matchTNodeWithReadOption(n, e, r) {
					if (null !== r) {
						const i = this.metadata.read;
						if (null !== i)
							if (i === U || i === xn || i === ir && 4 & e.type) this.addMatch(e.index, -2);
							else {
								const s = Ba(e, n, i, !1, !1);
								null !== s && this.addMatch(e.index, s)
							}
						else this.addMatch(e.index, r)
					}
				}
				addMatch(n, e) {
					null === this.matches ? this.matches = [n, e] : this.matches.push(n, e)
				}
			}

			function fk(t, n) {
				const e = t.localNames;
				if (null !== e)
					for (let r = 0; r < e.length; r += 2)
						if (e[r] === n) return e[r + 1];
				return null
			}

			function pk(t, n, e, r) {
				return -1 === e ? function hk(t, n) {
					return 11 & t.type ? qi(t, n) : 4 & t.type ? bl(t, n) : null
				}(n, t) : -2 === e ? function gk(t, n, e) {
					return e === U ? qi(n, t) : e === ir ? bl(n, t) : e === xn ? Tb(n, t) : void 0
				}(t, n, r) : Ws(t, t[1], e, n)
			}

			function Rb(t, n, e, r) {
				const i = n[19].queries[r];
				if (null === i.matches) {
					const s = t.data,
						o = e.matches,
						a = [];
					for (let l = 0; l < o.length; l += 2) {
						const u = o[l];
						a.push(u < 0 ? null : pk(n, s[u], o[l + 1], e.metadata.read))
					}
					i.matches = a
				}
				return i.matches
			}

			function Of(t, n, e, r) {
				const i = t.queries.getByIndex(e),
					s = i.matches;
				if (null !== s) {
					const o = Rb(t, n, i, e);
					for (let a = 0; a < s.length; a += 2) {
						const l = s[a];
						if (l > 0) r.push(o[a / 2]);
						else {
							const u = s[a + 1],
								c = n[-l];
							for (let d = 10; d < c.length; d++) {
								const f = c[d];
								f[17] === f[3] && Of(f[1], f, u, r)
							}
							if (null !== c[9]) {
								const d = c[9];
								for (let f = 0; f < d.length; f++) {
									const h = d[f];
									Of(h[1], h, u, r)
								}
							}
						}
					}
				}
				return r
			}

			function Je(t) {
				const n = D(),
					e = te(),
					r = hm();
				Pc(r + 1);
				const i = Nb(e, r);
				if (t.dirty && function x0(t) {
						return 4 == (4 & t[2])
					}(n) === (2 == (2 & i.metadata.flags))) {
					if (null === i.matches) t.reset([]);
					else {
						const s = i.crossesNgTemplate ? Of(e, n, r, []) : Rb(e, n, i, r);
						t.reset(s, vI), t.notifyOnChanges()
					}
					return !0
				}
				return !1
			}

			function si(t, n, e) {
				const r = te();
				r.firstCreatePass && (kb(r, new Fb(t, n, e), -1), 2 == (2 & n) && (r.staticViewQueries = !0)), Ob(r, D(), n)
			}

			function Ut(t, n, e, r) {
				const i = te();
				if (i.firstCreatePass) {
					const s = Ke();
					kb(i, new Fb(n, e, r), s.index),
						function yk(t, n) {
							const e = t.contentQueries || (t.contentQueries = []);
							n !== (e.length ? e[e.length - 1] : -1) && e.push(t.queries.length - 1, n)
						}(i, t), 2 == (2 & e) && (i.staticContentQueries = !0)
				}
				Ob(i, D(), e)
			}

			function et() {
				return function mk(t, n) {
					return t[19].queries[n].queryList
				}(D(), hm())
			}

			function Ob(t, n, e) {
				const r = new Af(4 == (4 & e));
				C_(t, n, r, r.destroy), null === n[19] && (n[19] = new Tf), n[19].queries.push(new If(r))
			}

			function kb(t, n, e) {
				null === t.queries && (t.queries = new Ff), t.queries.track(new Rf(n, e))
			}

			function Nb(t, n) {
				return t.queries.getByIndex(n)
			}

			function Cl(...t) {}
			const Dl = new S("Application Initializer");
			let xl = (() => {
				class t {
					constructor(e) {
						this.appInits = e, this.resolve = Cl, this.reject = Cl, this.initialized = !1, this.done = !1, this.donePromise = new Promise((r, i) => {
							this.resolve = r, this.reject = i
						})
					}
					runInitializers() {
						if (this.initialized) return;
						const e = [],
							r = () => {
								this.done = !0, this.resolve()
							};
						if (this.appInits)
							for (let i = 0; i < this.appInits.length; i++) {
								const s = this.appInits[i]();
								if (go(s)) e.push(s);
								else if (pf(s)) {
									const o = new Promise((a, l) => {
										s.subscribe({
											complete: a,
											error: l
										})
									});
									e.push(o)
								}
							}
						Promise.all(e).then(() => {
							r()
						}).catch(i => {
							this.reject(i)
						}), 0 === e.length && r(), this.initialized = !0
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(Dl, 8))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const Eo = new S("AppId", {
				providedIn: "root",
				factory: function ew() {
					return `${Vf()}${Vf()}${Vf()}`
				}
			});

			function Vf() {
				return String.fromCharCode(97 + Math.floor(25 * Math.random()))
			}
			const tw = new S("Platform Initializer"),
				an = new S("Platform ID", {
					providedIn: "platform",
					factory: () => "unknown"
				}),
				Bf = new S("appBootstrapListener"),
				ps = new S("AnimationModuleType");
			let Vk = (() => {
				class t {
					log(e) {
						console.log(e)
					}
					warn(e) {
						console.warn(e)
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "platform"
				}), t
			})();
			const Hn = new S("LocaleId", {
				providedIn: "root",
				factory: () => ge(Hn, P.Optional | P.SkipSelf) || function Bk() {
					return typeof $localize < "u" && $localize.locale || ds
				}()
			});
			class jk {
				constructor(n, e) {
					this.ngModuleFactory = n, this.componentFactories = e
				}
			}
			let Hf = (() => {
				class t {
					compileModuleSync(e) {
						return new xf(e)
					}
					compileModuleAsync(e) {
						return Promise.resolve(this.compileModuleSync(e))
					}
					compileModuleAndAllComponentsSync(e) {
						const r = this.compileModuleSync(e),
							s = tr(Lt(e).declarations).reduce((o, a) => {
								const l = fe(a);
								return l && o.push(new uo(l)), o
							}, []);
						return new jk(r, s)
					}
					compileModuleAndAllComponentsAsync(e) {
						return Promise.resolve(this.compileModuleAndAllComponentsSync(e))
					}
					clearCache() {}
					clearCacheFor(e) {}
					getModuleId(e) {}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const Gk = (() => Promise.resolve(0))();

			function jf(t) {
				typeof Zone > "u" ? Gk.then(() => {
					t && t.apply(null, null)
				}) : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
			}
			class se {
				constructor({
					enableLongStackTrace: n = !1,
					shouldCoalesceEventChangeDetection: e = !1,
					shouldCoalesceRunChangeDetection: r = !1
				}) {
					if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Me(!1), this.onMicrotaskEmpty = new Me(!1), this.onStable = new Me(!1), this.onError = new Me(!1), typeof Zone > "u") throw new w(908, !1);
					Zone.assertZonePatched();
					const i = this;
					if (i._nesting = 0, i._outer = i._inner = Zone.current, Zone.AsyncStackTaggingZoneSpec) {
						const s = Zone.AsyncStackTaggingZoneSpec;
						i._inner = i._inner.fork(new s("Angular"))
					}
					Zone.TaskTrackingZoneSpec && (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec)), n && Zone.longStackTraceZoneSpec && (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)), i.shouldCoalesceEventChangeDetection = !r && e, i.shouldCoalesceRunChangeDetection = r, i.lastRequestAnimationFrameId = -1, i.nativeRequestAnimationFrame = function zk() {
							let t = _e.requestAnimationFrame,
								n = _e.cancelAnimationFrame;
							if (typeof Zone < "u" && t && n) {
								const e = t[Zone.__symbol__("OriginalDelegate")];
								e && (t = e);
								const r = n[Zone.__symbol__("OriginalDelegate")];
								r && (n = r)
							}
							return {
								nativeRequestAnimationFrame: t,
								nativeCancelAnimationFrame: n
							}
						}().nativeRequestAnimationFrame,
						function Kk(t) {
							const n = () => {
								! function qk(t) {
									t.isCheckStableRunning || -1 !== t.lastRequestAnimationFrameId || (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(_e, () => {
										t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
											t.lastRequestAnimationFrameId = -1, Uf(t), t.isCheckStableRunning = !0, $f(t), t.isCheckStableRunning = !1
										}, void 0, () => {}, () => {})), t.fakeTopEventTask.invoke()
									}), Uf(t))
								}(t)
							};
							t._inner = t._inner.fork({
								name: "angular",
								properties: {
									isAngularZone: !0
								},
								onInvokeTask: (e, r, i, s, o, a) => {
									try {
										return iw(t), e.invokeTask(i, s, o, a)
									} finally {
										(t.shouldCoalesceEventChangeDetection && "eventTask" === s.type || t.shouldCoalesceRunChangeDetection) && n(), sw(t)
									}
								},
								onInvoke: (e, r, i, s, o, a, l) => {
									try {
										return iw(t), e.invoke(i, s, o, a, l)
									} finally {
										t.shouldCoalesceRunChangeDetection && n(), sw(t)
									}
								},
								onHasTask: (e, r, i, s) => {
									e.hasTask(i, s), r === i && ("microTask" == s.change ? (t._hasPendingMicrotasks = s.microTask, Uf(t), $f(t)) : "macroTask" == s.change && (t.hasPendingMacrotasks = s.macroTask))
								},
								onHandleError: (e, r, i, s) => (e.handleError(i, s), t.runOutsideAngular(() => t.onError.emit(s)), !1)
							})
						}(i)
				}
				static isInAngularZone() {
					return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
				}
				static assertInAngularZone() {
					if (!se.isInAngularZone()) throw new w(909, !1)
				}
				static assertNotInAngularZone() {
					if (se.isInAngularZone()) throw new w(909, !1)
				}
				run(n, e, r) {
					return this._inner.run(n, e, r)
				}
				runTask(n, e, r, i) {
					const s = this._inner,
						o = s.scheduleEventTask("NgZoneEvent: " + i, n, Wk, Cl, Cl);
					try {
						return s.runTask(o, e, r)
					} finally {
						s.cancelTask(o)
					}
				}
				runGuarded(n, e, r) {
					return this._inner.runGuarded(n, e, r)
				}
				runOutsideAngular(n) {
					return this._outer.run(n)
				}
			}
			const Wk = {};

			function $f(t) {
				if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable) try {
					t._nesting++, t.onMicrotaskEmpty.emit(null)
				} finally {
					if (t._nesting--, !t.hasPendingMicrotasks) try {
						t.runOutsideAngular(() => t.onStable.emit(null))
					} finally {
						t.isStable = !0
					}
				}
			}

			function Uf(t) {
				t.hasPendingMicrotasks = !!(t._hasPendingMicrotasks || (t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) && -1 !== t.lastRequestAnimationFrameId)
			}

			function iw(t) {
				t._nesting++, t.isStable && (t.isStable = !1, t.onUnstable.emit(null))
			}

			function sw(t) {
				t._nesting--, $f(t)
			}
			class Qk {
				constructor() {
					this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Me, this.onMicrotaskEmpty = new Me, this.onStable = new Me, this.onError = new Me
				}
				run(n, e, r) {
					return n.apply(e, r)
				}
				runGuarded(n, e, r) {
					return n.apply(e, r)
				}
				runOutsideAngular(n) {
					return n()
				}
				runTask(n, e, r, i) {
					return n.apply(e, r)
				}
			}
			const ow = new S(""),
				El = new S("");
			let Wf, Gf = (() => {
					class t {
						constructor(e, r, i) {
							this._ngZone = e, this.registry = r, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, Wf || (function Yk(t) {
								Wf = t
							}(i), i.addToWindow(r)), this._watchAngularEvents(), e.run(() => {
								this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
							})
						}
						_watchAngularEvents() {
							this._ngZone.onUnstable.subscribe({
								next: () => {
									this._didWork = !0, this._isZoneStable = !1
								}
							}), this._ngZone.runOutsideAngular(() => {
								this._ngZone.onStable.subscribe({
									next: () => {
										se.assertNotInAngularZone(), jf(() => {
											this._isZoneStable = !0, this._runCallbacksIfReady()
										})
									}
								})
							})
						}
						increasePendingRequestCount() {
							return this._pendingCount += 1, this._didWork = !0, this._pendingCount
						}
						decreasePendingRequestCount() {
							if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
							return this._runCallbacksIfReady(), this._pendingCount
						}
						isStable() {
							return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
						}
						_runCallbacksIfReady() {
							if (this.isStable()) jf(() => {
								for (; 0 !== this._callbacks.length;) {
									let e = this._callbacks.pop();
									clearTimeout(e.timeoutId), e.doneCb(this._didWork)
								}
								this._didWork = !1
							});
							else {
								let e = this.getPendingTasks();
								this._callbacks = this._callbacks.filter(r => !r.updateCb || !r.updateCb(e) || (clearTimeout(r.timeoutId), !1)), this._didWork = !0
							}
						}
						getPendingTasks() {
							return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(e => ({
								source: e.source,
								creationLocation: e.creationLocation,
								data: e.data
							})) : []
						}
						addCallback(e, r, i) {
							let s = -1;
							r && r > 0 && (s = setTimeout(() => {
								this._callbacks = this._callbacks.filter(o => o.timeoutId !== s), e(this._didWork, this.getPendingTasks())
							}, r)), this._callbacks.push({
								doneCb: e,
								timeoutId: s,
								updateCb: i
							})
						}
						whenStable(e, r, i) {
							if (i && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
							this.addCallback(e, r, i), this._runCallbacksIfReady()
						}
						getPendingRequestCount() {
							return this._pendingCount
						}
						registerApplication(e) {
							this.registry.registerApplication(e, this)
						}
						unregisterApplication(e) {
							this.registry.unregisterApplication(e)
						}
						findProviders(e, r, i) {
							return []
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(se), b(zf), b(El))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac
					}), t
				})(),
				zf = (() => {
					class t {
						constructor() {
							this._applications = new Map
						}
						registerApplication(e, r) {
							this._applications.set(e, r)
						}
						unregisterApplication(e) {
							this._applications.delete(e)
						}
						unregisterAllApplications() {
							this._applications.clear()
						}
						getTestability(e) {
							return this._applications.get(e) || null
						}
						getAllTestabilities() {
							return Array.from(this._applications.values())
						}
						getAllRootElements() {
							return Array.from(this._applications.keys())
						}
						findTestabilityInTree(e, r = !0) {
							return Wf?.findTestabilityInTree(this, e, r) ?? null
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac,
						providedIn: "platform"
					}), t
				})(),
				Tr = null;
			const aw = new S("AllowMultipleToken"),
				qf = new S("PlatformDestroyListeners");
			class lw {
				constructor(n, e) {
					this.name = n, this.token = e
				}
			}

			function cw(t, n, e = []) {
				const r = `Platform: ${n}`,
					i = new S(r);
				return (s = []) => {
					let o = Kf();
					if (!o || o.injector.get(aw, !1)) {
						const a = [...e, ...s, {
							provide: i,
							useValue: !0
						}];
						t ? t(a) : function Jk(t) {
							if (Tr && !Tr.get(aw, !1)) throw new w(400, !1);
							Tr = t;
							const n = t.get(fw);
							(function uw(t) {
								const n = t.get(tw, null);
								n && n.forEach(e => e())
							})(t)
						}(function dw(t = [], n) {
							return It.create({
								name: n,
								providers: [{
									provide: ud,
									useValue: "platform"
								}, {
									provide: qf,
									useValue: new Set([() => Tr = null])
								}, ...t]
							})
						}(a, r))
					}
					return function tN(t) {
						const n = Kf();
						if (!n) throw new w(401, !1);
						return n
					}()
				}
			}

			function Kf() {
				return Tr?.get(fw) ?? null
			}
			let fw = (() => {
				class t {
					constructor(e) {
						this._injector = e, this._modules = [], this._destroyListeners = [], this._destroyed = !1
					}
					bootstrapModuleFactory(e, r) {
						const i = function pw(t, n) {
								let e;
								return e = "noop" === t ? new Qk : ("zone.js" === t ? void 0 : t) || new se(n), e
							}(r?.ngZone, function hw(t) {
								return {
									enableLongStackTrace: !1,
									shouldCoalesceEventChangeDetection: !(!t || !t.ngZoneEventCoalescing) || !1,
									shouldCoalesceRunChangeDetection: !(!t || !t.ngZoneRunCoalescing) || !1
								}
							}(r)),
							s = [{
								provide: se,
								useValue: i
							}];
						return i.run(() => {
							const o = It.create({
									providers: s,
									parent: this.injector,
									name: e.moduleType.name
								}),
								a = e.create(o),
								l = a.injector.get(er, null);
							if (!l) throw new w(402, !1);
							return i.runOutsideAngular(() => {
									const u = i.onError.subscribe({
										next: c => {
											l.handleError(c)
										}
									});
									a.onDestroy(() => {
										Ml(this._modules, a), u.unsubscribe()
									})
								}),
								function gw(t, n, e) {
									try {
										const r = e();
										return go(r) ? r.catch(i => {
											throw n.runOutsideAngular(() => t.handleError(i)), i
										}) : r
									} catch (r) {
										throw n.runOutsideAngular(() => t.handleError(r)), r
									}
								}(l, i, () => {
									const u = a.injector.get(xl);
									return u.runInitializers(), u.donePromise.then(() => (function Uv(t) {
										Nt(t, "Expected localeId to be defined"), "string" == typeof t && ($v = t.toLowerCase().replace(/_/g, "-"))
									}(a.injector.get(Hn, ds) || ds), this._moduleDoBootstrap(a), a))
								})
						})
					}
					bootstrapModule(e, r = []) {
						const i = mw({}, r);
						return function Zk(t, n, e) {
							const r = new xf(e);
							return Promise.resolve(r)
						}(0, 0, e).then(s => this.bootstrapModuleFactory(s, i))
					}
					_moduleDoBootstrap(e) {
						const r = e.injector.get(Mo);
						if (e._bootstrapComponents.length > 0) e._bootstrapComponents.forEach(i => r.bootstrap(i));
						else {
							if (!e.instance.ngDoBootstrap) throw new w(403, !1);
							e.instance.ngDoBootstrap(r)
						}
						this._modules.push(e)
					}
					onDestroy(e) {
						this._destroyListeners.push(e)
					}
					get injector() {
						return this._injector
					}
					destroy() {
						if (this._destroyed) throw new w(404, !1);
						this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
						const e = this._injector.get(qf, null);
						e && (e.forEach(r => r()), e.clear()), this._destroyed = !0
					}
					get destroyed() {
						return this._destroyed
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(It))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "platform"
				}), t
			})();

			function mw(t, n) {
				return Array.isArray(n) ? n.reduce(mw, t) : {
					...t,
					...n
				}
			}
			let Mo = (() => {
				class t {
					constructor(e, r, i) {
						this._zone = e, this._injector = r, this._exceptionHandler = i, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this._destroyed = !1, this._destroyListeners = [], this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
							next: () => {
								this._zone.run(() => {
									this.tick()
								})
							}
						});
						const s = new Ce(a => {
								this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
									a.next(this._stable), a.complete()
								})
							}),
							o = new Ce(a => {
								let l;
								this._zone.runOutsideAngular(() => {
									l = this._zone.onStable.subscribe(() => {
										se.assertNotInAngularZone(), jf(() => {
											!this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0, a.next(!0))
										})
									})
								});
								const u = this._zone.onUnstable.subscribe(() => {
									se.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
										a.next(!1)
									}))
								});
								return () => {
									l.unsubscribe(), u.unsubscribe()
								}
							});
						this.isStable = _a(s, o.pipe(Wg()))
					}
					get destroyed() {
						return this._destroyed
					}
					get injector() {
						return this._injector
					}
					bootstrap(e, r) {
						const i = e instanceof py;
						if (!this._injector.get(xl).done) throw !i && function Ai(t) {
							const n = fe(t) || pt(t) || gt(t);
							return null !== n && n.standalone
						}(e), new w(405, false);
						let o;
						o = i ? e : this._injector.get(ro).resolveComponentFactory(e), this.componentTypes.push(o.componentType);
						const a = function Xk(t) {
								return t.isBoundToModule
							}(o) ? void 0 : this._injector.get(ii),
							u = o.create(It.NULL, [], r || o.selector, a),
							c = u.location.nativeElement,
							d = u.injector.get(ow, null);
						return d?.registerApplication(c), u.onDestroy(() => {
							this.detachView(u.hostView), Ml(this.components, u), d?.unregisterApplication(c)
						}), this._loadComponent(u), u
					}
					tick() {
						if (this._runningTick) throw new w(101, !1);
						try {
							this._runningTick = !0;
							for (let e of this._views) e.detectChanges()
						} catch (e) {
							this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e))
						} finally {
							this._runningTick = !1
						}
					}
					attachView(e) {
						const r = e;
						this._views.push(r), r.attachToAppRef(this)
					}
					detachView(e) {
						const r = e;
						Ml(this._views, r), r.detachFromAppRef()
					}
					_loadComponent(e) {
						this.attachView(e.hostView), this.tick(), this.components.push(e), this._injector.get(Bf, []).concat(this._bootstrapListeners).forEach(i => i(e))
					}
					ngOnDestroy() {
						if (!this._destroyed) try {
							this._destroyListeners.forEach(e => e()), this._views.slice().forEach(e => e.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
						} finally {
							this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
						}
					}
					onDestroy(e) {
						return this._destroyListeners.push(e), () => Ml(this._destroyListeners, e)
					}
					destroy() {
						if (this._destroyed) throw new w(406, !1);
						const e = this._injector;
						e.destroy && !e.destroyed && e.destroy()
					}
					get viewCount() {
						return this._views.length
					}
					warnIfDestroyed() {}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(se), b(Mr), b(er))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();

			function Ml(t, n) {
				const e = t.indexOf(n);
				e > -1 && t.splice(e, 1)
			}
			let _w = !0,
				Ao = (() => {
					class t {}
					return t.__NG_ELEMENT_ID__ = iN, t
				})();

			function iN(t) {
				return function sN(t, n, e) {
					if (Aa(t) && !e) {
						const r = Vt(t.index, n);
						return new lo(r, r)
					}
					return 47 & t.type ? new lo(n[16], n) : null
				}(Ke(), D(), 16 == (16 & t))
			}
			const _N = cw(null, "core", []);
			let vN = (() => {
					class t {
						constructor(e) {}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(Mo))
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({}), t
				})(),
				Il = null;

			function jn() {
				return Il
			}
			const oe = new S("DocumentToken");
			let Jf = (() => {
				class t {
					historyGo(e) {
						throw new Error("Not implemented")
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275prov = E({
					token: t,
					factory: function() {
						return function DN() {
							return b(Iw)
						}()
					},
					providedIn: "platform"
				}), t
			})();
			const xN = new S("Location Initialized");
			let Iw = (() => {
				class t extends Jf {
					constructor(e) {
						super(), this._doc = e, this._init()
					}
					_init() {
						this.location = window.location, this._history = window.history
					}
					getBaseHrefFromDOM() {
						return jn().getBaseHref(this._doc)
					}
					onPopState(e) {
						const r = jn().getGlobalEventTarget(this._doc, "window");
						return r.addEventListener("popstate", e, !1), () => r.removeEventListener("popstate", e)
					}
					onHashChange(e) {
						const r = jn().getGlobalEventTarget(this._doc, "window");
						return r.addEventListener("hashchange", e, !1), () => r.removeEventListener("hashchange", e)
					}
					get href() {
						return this.location.href
					}
					get protocol() {
						return this.location.protocol
					}
					get hostname() {
						return this.location.hostname
					}
					get port() {
						return this.location.port
					}
					get pathname() {
						return this.location.pathname
					}
					get search() {
						return this.location.search
					}
					get hash() {
						return this.location.hash
					}
					set pathname(e) {
						this.location.pathname = e
					}
					pushState(e, r, i) {
						Tw() ? this._history.pushState(e, r, i) : this.location.hash = i
					}
					replaceState(e, r, i) {
						Tw() ? this._history.replaceState(e, r, i) : this.location.hash = i
					}
					forward() {
						this._history.forward()
					}
					back() {
						this._history.back()
					}
					historyGo(e = 0) {
						this._history.go(e)
					}
					getState() {
						return this._history.state
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(oe))
				}, t.\u0275prov = E({
					token: t,
					factory: function() {
						return function EN() {
							return new Iw(b(oe))
						}()
					},
					providedIn: "platform"
				}), t
			})();

			function Tw() {
				return !!window.history.pushState
			}

			function eh(t, n) {
				if (0 == t.length) return n;
				if (0 == n.length) return t;
				let e = 0;
				return t.endsWith("/") && e++, n.startsWith("/") && e++, 2 == e ? t + n.substring(1) : 1 == e ? t + n : t + "/" + n
			}

			function Fw(t) {
				const n = t.match(/#|\?|$/),
					e = n && n.index || t.length;
				return t.slice(0, e - ("/" === t[e - 1] ? 1 : 0)) + t.slice(e)
			}

			function ar(t) {
				return t && "?" !== t[0] ? "?" + t : t
			}
			let li = (() => {
				class t {
					historyGo(e) {
						throw new Error("Not implemented")
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275prov = E({
					token: t,
					factory: function() {
						return ge(Ow)
					},
					providedIn: "root"
				}), t
			})();
			const Rw = new S("appBaseHref");
			let Ow = (() => {
					class t extends li {
						constructor(e, r) {
							super(), this._platformLocation = e, this._removeListenerFns = [], this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? ge(oe).location?.origin ?? ""
						}
						ngOnDestroy() {
							for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
						}
						onPopState(e) {
							this._removeListenerFns.push(this._platformLocation.onPopState(e), this._platformLocation.onHashChange(e))
						}
						getBaseHref() {
							return this._baseHref
						}
						prepareExternalUrl(e) {
							return eh(this._baseHref, e)
						}
						path(e = !1) {
							const r = this._platformLocation.pathname + ar(this._platformLocation.search),
								i = this._platformLocation.hash;
							return i && e ? `${r}${i}` : r
						}
						pushState(e, r, i, s) {
							const o = this.prepareExternalUrl(i + ar(s));
							this._platformLocation.pushState(e, r, o)
						}
						replaceState(e, r, i, s) {
							const o = this.prepareExternalUrl(i + ar(s));
							this._platformLocation.replaceState(e, r, o)
						}
						forward() {
							this._platformLocation.forward()
						}
						back() {
							this._platformLocation.back()
						}
						getState() {
							return this._platformLocation.getState()
						}
						historyGo(e = 0) {
							this._platformLocation.historyGo?.(e)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(Jf), b(Rw, 8))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac,
						providedIn: "root"
					}), t
				})(),
				MN = (() => {
					class t extends li {
						constructor(e, r) {
							super(), this._platformLocation = e, this._baseHref = "", this._removeListenerFns = [], null != r && (this._baseHref = r)
						}
						ngOnDestroy() {
							for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
						}
						onPopState(e) {
							this._removeListenerFns.push(this._platformLocation.onPopState(e), this._platformLocation.onHashChange(e))
						}
						getBaseHref() {
							return this._baseHref
						}
						path(e = !1) {
							let r = this._platformLocation.hash;
							return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r
						}
						prepareExternalUrl(e) {
							const r = eh(this._baseHref, e);
							return r.length > 0 ? "#" + r : r
						}
						pushState(e, r, i, s) {
							let o = this.prepareExternalUrl(i + ar(s));
							0 == o.length && (o = this._platformLocation.pathname), this._platformLocation.pushState(e, r, o)
						}
						replaceState(e, r, i, s) {
							let o = this.prepareExternalUrl(i + ar(s));
							0 == o.length && (o = this._platformLocation.pathname), this._platformLocation.replaceState(e, r, o)
						}
						forward() {
							this._platformLocation.forward()
						}
						back() {
							this._platformLocation.back()
						}
						getState() {
							return this._platformLocation.getState()
						}
						historyGo(e = 0) {
							this._platformLocation.historyGo?.(e)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(Jf), b(Rw, 8))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac
					}), t
				})(),
				th = (() => {
					class t {
						constructor(e) {
							this._subject = new Me, this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = e;
							const r = this._locationStrategy.getBaseHref();
							this._baseHref = Fw(kw(r)), this._locationStrategy.onPopState(i => {
								this._subject.emit({
									url: this.path(!0),
									pop: !0,
									state: i.state,
									type: i.type
								})
							})
						}
						ngOnDestroy() {
							this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = []
						}
						path(e = !1) {
							return this.normalize(this._locationStrategy.path(e))
						}
						getState() {
							return this._locationStrategy.getState()
						}
						isCurrentPathEqualTo(e, r = "") {
							return this.path() == this.normalize(e + ar(r))
						}
						normalize(e) {
							return t.stripTrailingSlash(function SN(t, n) {
								return t && n.startsWith(t) ? n.substring(t.length) : n
							}(this._baseHref, kw(e)))
						}
						prepareExternalUrl(e) {
							return e && "/" !== e[0] && (e = "/" + e), this._locationStrategy.prepareExternalUrl(e)
						}
						go(e, r = "", i = null) {
							this._locationStrategy.pushState(i, "", e, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(e + ar(r)), i)
						}
						replaceState(e, r = "", i = null) {
							this._locationStrategy.replaceState(i, "", e, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(e + ar(r)), i)
						}
						forward() {
							this._locationStrategy.forward()
						}
						back() {
							this._locationStrategy.back()
						}
						historyGo(e = 0) {
							this._locationStrategy.historyGo?.(e)
						}
						onUrlChange(e) {
							return this._urlChangeListeners.push(e), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(r => {
								this._notifyUrlChangeListeners(r.url, r.state)
							})), () => {
								const r = this._urlChangeListeners.indexOf(e);
								this._urlChangeListeners.splice(r, 1), 0 === this._urlChangeListeners.length && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null)
							}
						}
						_notifyUrlChangeListeners(e = "", r) {
							this._urlChangeListeners.forEach(i => i(e, r))
						}
						subscribe(e, r, i) {
							return this._subject.subscribe({
								next: e,
								error: r,
								complete: i
							})
						}
					}
					return t.normalizeQueryParams = ar, t.joinWithSlash = eh, t.stripTrailingSlash = Fw, t.\u0275fac = function(e) {
						return new(e || t)(b(li))
					}, t.\u0275prov = E({
						token: t,
						factory: function() {
							return function AN() {
								return new th(b(li))
							}()
						},
						providedIn: "root"
					}), t
				})();

			function kw(t) {
				return t.replace(/\/index.html$/, "")
			}

			function Uw(t, n) {
				n = encodeURIComponent(n);
				for (const e of t.split(";")) {
					const r = e.indexOf("="),
						[i, s] = -1 == r ? [e, ""] : [e.slice(0, r), e.slice(r + 1)];
					if (i.trim() === n) return decodeURIComponent(s)
				}
				return null
			}
			let qw = (() => {
				class t {
					constructor(e, r) {
						this._viewContainer = e, this._context = new m1, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = r
					}
					set ngIf(e) {
						this._context.$implicit = this._context.ngIf = e, this._updateView()
					}
					set ngIfThen(e) {
						Kw("ngIfThen", e), this._thenTemplateRef = e, this._thenViewRef = null, this._updateView()
					}
					set ngIfElse(e) {
						Kw("ngIfElse", e), this._elseTemplateRef = e, this._elseViewRef = null, this._updateView()
					}
					_updateView() {
						this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
					}
					static ngTemplateContextGuard(e, r) {
						return !0
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(p(xn), p(ir))
				}, t.\u0275dir = x({
					type: t,
					selectors: [
						["", "ngIf", ""]
					],
					inputs: {
						ngIf: "ngIf",
						ngIfThen: "ngIfThen",
						ngIfElse: "ngIfElse"
					},
					standalone: !0
				}), t
			})();
			class m1 {
				constructor() {
					this.$implicit = null, this.ngIf = null
				}
			}

			function Kw(t, n) {
				if (n && !n.createEmbeddedView) throw new Error(`${t} must be a TemplateRef, but received '${pe(n)}'.`)
			}
			class fh {
				constructor(n, e) {
					this._viewContainerRef = n, this._templateRef = e, this._created = !1
				}
				create() {
					this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef)
				}
				destroy() {
					this._created = !1, this._viewContainerRef.clear()
				}
				enforceState(n) {
					n && !this._created ? this.create() : !n && this._created && this.destroy()
				}
			}
			let Bl = (() => {
					class t {
						constructor() {
							this._defaultUsed = !1, this._caseCount = 0, this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1
						}
						set ngSwitch(e) {
							this._ngSwitch = e, 0 === this._caseCount && this._updateDefaultCases(!0)
						}
						_addCase() {
							return this._caseCount++
						}
						_addDefault(e) {
							this._defaultViews || (this._defaultViews = []), this._defaultViews.push(e)
						}
						_matchCase(e) {
							const r = e == this._ngSwitch;
							return this._lastCasesMatched = this._lastCasesMatched || r, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), r
						}
						_updateDefaultCases(e) {
							if (this._defaultViews && e !== this._defaultUsed) {
								this._defaultUsed = e;
								for (let r = 0; r < this._defaultViews.length; r++) this._defaultViews[r].enforceState(e)
							}
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["", "ngSwitch", ""]
						],
						inputs: {
							ngSwitch: "ngSwitch"
						},
						standalone: !0
					}), t
				})(),
				Qw = (() => {
					class t {
						constructor(e, r, i) {
							this.ngSwitch = i, i._addCase(), this._view = new fh(e, r)
						}
						ngDoCheck() {
							this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase))
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(xn), p(ir), p(Bl, 9))
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["", "ngSwitchCase", ""]
						],
						inputs: {
							ngSwitchCase: "ngSwitchCase"
						},
						standalone: !0
					}), t
				})(),
				Xw = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({}), t
				})();
			const Jw = "browser";

			function ui(t) {
				return t === Jw
			}

			function gs(t) {
				return "server" === t
			}
			let G1 = (() => {
				class t {}
				return t.\u0275prov = E({
					token: t,
					providedIn: "root",
					factory: () => new z1(b(oe), window)
				}), t
			})();
			class z1 {
				constructor(n, e) {
					this.document = n, this.window = e, this.offset = () => [0, 0]
				}
				setOffset(n) {
					this.offset = Array.isArray(n) ? () => n : n
				}
				getScrollPosition() {
					return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
				}
				scrollToPosition(n) {
					this.supportsScrolling() && this.window.scrollTo(n[0], n[1])
				}
				scrollToAnchor(n) {
					if (!this.supportsScrolling()) return;
					const e = function W1(t, n) {
						const e = t.getElementById(n) || t.getElementsByName(n)[0];
						if (e) return e;
						if ("function" == typeof t.createTreeWalker && t.body && (t.body.createShadowRoot || t.body.attachShadow)) {
							const r = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
							let i = r.currentNode;
							for (; i;) {
								const s = i.shadowRoot;
								if (s) {
									const o = s.getElementById(n) || s.querySelector(`[name="${n}"]`);
									if (o) return o
								}
								i = r.nextNode()
							}
						}
						return null
					}(this.document, n);
					e && (this.scrollToElement(e), e.focus())
				}
				setHistoryScrollRestoration(n) {
					if (this.supportScrollRestoration()) {
						const e = this.window.history;
						e && e.scrollRestoration && (e.scrollRestoration = n)
					}
				}
				scrollToElement(n) {
					const e = n.getBoundingClientRect(),
						r = e.left + this.window.pageXOffset,
						i = e.top + this.window.pageYOffset,
						s = this.offset();
					this.window.scrollTo(r - s[0], i - s[1])
				}
				supportScrollRestoration() {
					try {
						if (!this.supportsScrolling()) return !1;
						const n = eC(this.window.history) || eC(Object.getPrototypeOf(this.window.history));
						return !(!n || !n.writable && !n.set)
					} catch {
						return !1
					}
				}
				supportsScrolling() {
					try {
						return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window
					} catch {
						return !1
					}
				}
			}

			function eC(t) {
				return Object.getOwnPropertyDescriptor(t, "scrollRestoration")
			}
			class tC {}
			class _h extends class cL extends class CN {} {
				constructor() {
					super(...arguments), this.supportsDOMEvents = !0
				}
			} {
				static makeCurrent() {
					! function wN(t) {
						Il || (Il = t)
					}(new _h)
				}
				onAndCancel(n, e, r) {
					return n.addEventListener(e, r, !1), () => {
						n.removeEventListener(e, r, !1)
					}
				}
				dispatchEvent(n, e) {
					n.dispatchEvent(e)
				}
				remove(n) {
					n.parentNode && n.parentNode.removeChild(n)
				}
				createElement(n, e) {
					return (e = e || this.getDefaultDocument()).createElement(n)
				}
				createHtmlDocument() {
					return document.implementation.createHTMLDocument("fakeTitle")
				}
				getDefaultDocument() {
					return document
				}
				isElementNode(n) {
					return n.nodeType === Node.ELEMENT_NODE
				}
				isShadowRoot(n) {
					return n instanceof DocumentFragment
				}
				getGlobalEventTarget(n, e) {
					return "window" === e ? window : "document" === e ? n : "body" === e ? n.body : null
				}
				getBaseHref(n) {
					const e = function dL() {
						return Ro = Ro || document.querySelector("base"), Ro ? Ro.getAttribute("href") : null
					}();
					return null == e ? null : function fL(t) {
						jl = jl || document.createElement("a"), jl.setAttribute("href", t);
						const n = jl.pathname;
						return "/" === n.charAt(0) ? n : `/${n}`
					}(e)
				}
				resetBaseElement() {
					Ro = null
				}
				getUserAgent() {
					return window.navigator.userAgent
				}
				getCookie(n) {
					return Uw(document.cookie, n)
				}
			}
			let jl, Ro = null;
			const sC = new S("TRANSITION_ID"),
				pL = [{
					provide: Dl,
					useFactory: function hL(t, n, e) {
						return () => {
							e.get(xl).donePromise.then(() => {
								const r = jn(),
									i = n.querySelectorAll(`style[ng-transition="${t}"]`);
								for (let s = 0; s < i.length; s++) r.remove(i[s])
							})
						}
					},
					deps: [sC, oe, It],
					multi: !0
				}];
			let mL = (() => {
				class t {
					build() {
						return new XMLHttpRequest
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();
			const $l = new S("EventManagerPlugins");
			let Ul = (() => {
				class t {
					constructor(e, r) {
						this._zone = r, this._eventNameToPlugin = new Map, e.forEach(i => i.manager = this), this._plugins = e.slice().reverse()
					}
					addEventListener(e, r, i) {
						return this._findPluginFor(r).addEventListener(e, r, i)
					}
					addGlobalEventListener(e, r, i) {
						return this._findPluginFor(r).addGlobalEventListener(e, r, i)
					}
					getZone() {
						return this._zone
					}
					_findPluginFor(e) {
						const r = this._eventNameToPlugin.get(e);
						if (r) return r;
						const i = this._plugins;
						for (let s = 0; s < i.length; s++) {
							const o = i[s];
							if (o.supports(e)) return this._eventNameToPlugin.set(e, o), o
						}
						throw new Error(`No event manager plugin found for event ${e}`)
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b($l), b(se))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();
			class oC {
				constructor(n) {
					this._doc = n
				}
				addGlobalEventListener(n, e, r) {
					const i = jn().getGlobalEventTarget(this._doc, n);
					if (!i) throw new Error(`Unsupported event target ${i} for event ${e}`);
					return this.addEventListener(i, e, r)
				}
			}
			let aC = (() => {
					class t {
						constructor() {
							this._stylesSet = new Set
						}
						addStyles(e) {
							const r = new Set;
							e.forEach(i => {
								this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i))
							}), this.onStylesAdded(r)
						}
						onStylesAdded(e) {}
						getAllStyles() {
							return Array.from(this._stylesSet)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac
					}), t
				})(),
				Oo = (() => {
					class t extends aC {
						constructor(e) {
							super(), this._doc = e, this._hostNodes = new Map, this._hostNodes.set(e.head, [])
						}
						_addStylesToHost(e, r, i) {
							e.forEach(s => {
								const o = this._doc.createElement("style");
								o.textContent = s, i.push(r.appendChild(o))
							})
						}
						addHost(e) {
							const r = [];
							this._addStylesToHost(this._stylesSet, e, r), this._hostNodes.set(e, r)
						}
						removeHost(e) {
							const r = this._hostNodes.get(e);
							r && r.forEach(lC), this._hostNodes.delete(e)
						}
						onStylesAdded(e) {
							this._hostNodes.forEach((r, i) => {
								this._addStylesToHost(e, i, r)
							})
						}
						ngOnDestroy() {
							this._hostNodes.forEach(e => e.forEach(lC))
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(oe))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac
					}), t
				})();

			function lC(t) {
				jn().remove(t)
			}
			const vh = {
					svg: "http://www.w3.org/2000/svg",
					xhtml: "http://www.w3.org/1999/xhtml",
					xlink: "http://www.w3.org/1999/xlink",
					xml: "http://www.w3.org/XML/1998/namespace",
					xmlns: "http://www.w3.org/2000/xmlns/",
					math: "http://www.w3.org/1998/MathML/"
				},
				bh = /%COMP%/g;

			function Gl(t, n, e) {
				for (let r = 0; r < n.length; r++) {
					let i = n[r];
					Array.isArray(i) ? Gl(t, i, e) : (i = i.replace(bh, t), e.push(i))
				}
				return e
			}

			function dC(t) {
				return n => {
					if ("__ngUnwrap__" === n) return t;
					!1 === t(n) && (n.preventDefault(), n.returnValue = !1)
				}
			}
			let zl = (() => {
				class t {
					constructor(e, r, i) {
						this.eventManager = e, this.sharedStylesHost = r, this.appId = i, this.rendererByCompId = new Map, this.defaultRenderer = new wh(e)
					}
					createRenderer(e, r) {
						if (!e || !r) return this.defaultRenderer;
						switch (r.encapsulation) {
							case gn.Emulated: {
								let i = this.rendererByCompId.get(r.id);
								return i || (i = new CL(this.eventManager, this.sharedStylesHost, r, this.appId), this.rendererByCompId.set(r.id, i)), i.applyToHost(e), i
							}
							case 1:
							case gn.ShadowDom:
								return new DL(this.eventManager, this.sharedStylesHost, e, r);
							default:
								if (!this.rendererByCompId.has(r.id)) {
									const i = Gl(r.id, r.styles, []);
									this.sharedStylesHost.addStyles(i), this.rendererByCompId.set(r.id, this.defaultRenderer)
								}
								return this.defaultRenderer
						}
					}
					begin() {}
					end() {}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(Ul), b(Oo), b(Eo))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();
			class wh {
				constructor(n) {
					this.eventManager = n, this.data = Object.create(null), this.destroyNode = null
				}
				destroy() {}
				createElement(n, e) {
					return e ? document.createElementNS(vh[e] || e, n) : document.createElement(n)
				}
				createComment(n) {
					return document.createComment(n)
				}
				createText(n) {
					return document.createTextNode(n)
				}
				appendChild(n, e) {
					(hC(n) ? n.content : n).appendChild(e)
				}
				insertBefore(n, e, r) {
					n && (hC(n) ? n.content : n).insertBefore(e, r)
				}
				removeChild(n, e) {
					n && n.removeChild(e)
				}
				selectRootElement(n, e) {
					let r = "string" == typeof n ? document.querySelector(n) : n;
					if (!r) throw new Error(`The selector "${n}" did not match any elements`);
					return e || (r.textContent = ""), r
				}
				parentNode(n) {
					return n.parentNode
				}
				nextSibling(n) {
					return n.nextSibling
				}
				setAttribute(n, e, r, i) {
					if (i) {
						e = i + ":" + e;
						const s = vh[i];
						s ? n.setAttributeNS(s, e, r) : n.setAttribute(e, r)
					} else n.setAttribute(e, r)
				}
				removeAttribute(n, e, r) {
					if (r) {
						const i = vh[r];
						i ? n.removeAttributeNS(i, e) : n.removeAttribute(`${r}:${e}`)
					} else n.removeAttribute(e)
				}
				addClass(n, e) {
					n.classList.add(e)
				}
				removeClass(n, e) {
					n.classList.remove(e)
				}
				setStyle(n, e, r, i) {
					i & (St.DashCase | St.Important) ? n.style.setProperty(e, r, i & St.Important ? "important" : "") : n.style[e] = r
				}
				removeStyle(n, e, r) {
					r & St.DashCase ? n.style.removeProperty(e) : n.style[e] = ""
				}
				setProperty(n, e, r) {
					n[e] = r
				}
				setValue(n, e) {
					n.nodeValue = e
				}
				listen(n, e, r) {
					return "string" == typeof n ? this.eventManager.addGlobalEventListener(n, e, dC(r)) : this.eventManager.addEventListener(n, e, dC(r))
				}
			}

			function hC(t) {
				return "TEMPLATE" === t.tagName && void 0 !== t.content
			}
			class CL extends wh {
				constructor(n, e, r, i) {
					super(n), this.component = r;
					const s = Gl(i + "-" + r.id, r.styles, []);
					e.addStyles(s), this.contentAttr = function vL(t) {
						return "_ngcontent-%COMP%".replace(bh, t)
					}(i + "-" + r.id), this.hostAttr = function bL(t) {
						return "_nghost-%COMP%".replace(bh, t)
					}(i + "-" + r.id)
				}
				applyToHost(n) {
					super.setAttribute(n, this.hostAttr, "")
				}
				createElement(n, e) {
					const r = super.createElement(n, e);
					return super.setAttribute(r, this.contentAttr, ""), r
				}
			}
			class DL extends wh {
				constructor(n, e, r, i) {
					super(n), this.sharedStylesHost = e, this.hostEl = r, this.shadowRoot = r.attachShadow({
						mode: "open"
					}), this.sharedStylesHost.addHost(this.shadowRoot);
					const s = Gl(i.id, i.styles, []);
					for (let o = 0; o < s.length; o++) {
						const a = document.createElement("style");
						a.textContent = s[o], this.shadowRoot.appendChild(a)
					}
				}
				nodeOrShadowRoot(n) {
					return n === this.hostEl ? this.shadowRoot : n
				}
				destroy() {
					this.sharedStylesHost.removeHost(this.shadowRoot)
				}
				appendChild(n, e) {
					return super.appendChild(this.nodeOrShadowRoot(n), e)
				}
				insertBefore(n, e, r) {
					return super.insertBefore(this.nodeOrShadowRoot(n), e, r)
				}
				removeChild(n, e) {
					return super.removeChild(this.nodeOrShadowRoot(n), e)
				}
				parentNode(n) {
					return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))
				}
			}
			let xL = (() => {
				class t extends oC {
					constructor(e) {
						super(e)
					}
					supports(e) {
						return !0
					}
					addEventListener(e, r, i) {
						return e.addEventListener(r, i, !1), () => this.removeEventListener(e, r, i)
					}
					removeEventListener(e, r, i) {
						return e.removeEventListener(r, i)
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(oe))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();
			const pC = ["alt", "control", "meta", "shift"],
				EL = {
					"\b": "Backspace",
					"\t": "Tab",
					"\x7f": "Delete",
					"\x1b": "Escape",
					Del: "Delete",
					Esc: "Escape",
					Left: "ArrowLeft",
					Right: "ArrowRight",
					Up: "ArrowUp",
					Down: "ArrowDown",
					Menu: "ContextMenu",
					Scroll: "ScrollLock",
					Win: "OS"
				},
				ML = {
					alt: t => t.altKey,
					control: t => t.ctrlKey,
					meta: t => t.metaKey,
					shift: t => t.shiftKey
				};
			let AL = (() => {
				class t extends oC {
					constructor(e) {
						super(e)
					}
					supports(e) {
						return null != t.parseEventName(e)
					}
					addEventListener(e, r, i) {
						const s = t.parseEventName(r),
							o = t.eventCallback(s.fullKey, i, this.manager.getZone());
						return this.manager.getZone().runOutsideAngular(() => jn().onAndCancel(e, s.domEventName, o))
					}
					static parseEventName(e) {
						const r = e.toLowerCase().split("."),
							i = r.shift();
						if (0 === r.length || "keydown" !== i && "keyup" !== i) return null;
						const s = t._normalizeKey(r.pop());
						let o = "",
							a = r.indexOf("code");
						if (a > -1 && (r.splice(a, 1), o = "code."), pC.forEach(u => {
								const c = r.indexOf(u);
								c > -1 && (r.splice(c, 1), o += u + ".")
							}), o += s, 0 != r.length || 0 === s.length) return null;
						const l = {};
						return l.domEventName = i, l.fullKey = o, l
					}
					static matchEventFullKeyCode(e, r) {
						let i = EL[e.key] || e.key,
							s = "";
						return r.indexOf("code.") > -1 && (i = e.code, s = "code."), !(null == i || !i) && (i = i.toLowerCase(), " " === i ? i = "space" : "." === i && (i = "dot"), pC.forEach(o => {
							o !== i && (0, ML[o])(e) && (s += o + ".")
						}), s += i, s === r)
					}
					static eventCallback(e, r, i) {
						return s => {
							t.matchEventFullKeyCode(s, e) && i.runGuarded(() => r(s))
						}
					}
					static _normalizeKey(e) {
						return "esc" === e ? "escape" : e
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(oe))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();
			const FL = cw(_N, "browser", [{
					provide: an,
					useValue: Jw
				}, {
					provide: tw,
					useValue: function SL() {
						_h.makeCurrent()
					},
					multi: !0
				}, {
					provide: oe,
					useFactory: function TL() {
						return function IS(t) {
							Jc = t
						}(document), document
					},
					deps: []
				}]),
				yC = new S(""),
				_C = [{
					provide: El,
					useClass: class gL {
						addToWindow(n) {
							_e.getAngularTestability = (r, i = !0) => {
								const s = n.findTestabilityInTree(r, i);
								if (null == s) throw new Error("Could not find testability for element.");
								return s
							}, _e.getAllAngularTestabilities = () => n.getAllTestabilities(), _e.getAllAngularRootElements = () => n.getAllRootElements(), _e.frameworkStabilizers || (_e.frameworkStabilizers = []), _e.frameworkStabilizers.push(r => {
								const i = _e.getAllAngularTestabilities();
								let s = i.length,
									o = !1;
								const a = function(l) {
									o = o || l, s--, 0 == s && r(o)
								};
								i.forEach(function(l) {
									l.whenStable(a)
								})
							})
						}
						findTestabilityInTree(n, e, r) {
							return null == e ? null : n.getTestability(e) ?? (r ? jn().isShadowRoot(e) ? this.findTestabilityInTree(n, e.host, !0) : this.findTestabilityInTree(n, e.parentElement, !0) : null)
						}
					},
					deps: []
				}, {
					provide: ow,
					useClass: Gf,
					deps: [se, zf, El]
				}, {
					provide: Gf,
					useClass: Gf,
					deps: [se, zf, El]
				}],
				vC = [{
						provide: ud,
						useValue: "root"
					}, {
						provide: er,
						useFactory: function IL() {
							return new er
						},
						deps: []
					}, {
						provide: $l,
						useClass: xL,
						multi: !0,
						deps: [oe, se, an]
					}, {
						provide: $l,
						useClass: AL,
						multi: !0,
						deps: [oe]
					}, {
						provide: zl,
						useClass: zl,
						deps: [Ul, Oo, Eo]
					}, {
						provide: io,
						useExisting: zl
					}, {
						provide: aC,
						useExisting: Oo
					}, {
						provide: Oo,
						useClass: Oo,
						deps: [oe]
					}, {
						provide: Ul,
						useClass: Ul,
						deps: [$l, se]
					}, {
						provide: tC,
						useClass: mL,
						deps: []
					},
					[]
				];
			let bC = (() => {
					class t {
						constructor(e) {}
						static withServerTransition(e) {
							return {
								ngModule: t,
								providers: [{
									provide: Eo,
									useValue: e.appId
								}, {
									provide: sC,
									useExisting: Eo
								}, pL]
							}
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(yC, 12))
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						providers: [...vC, ..._C],
						imports: [Xw, vN]
					}), t
				})(),
				wC = (() => {
					class t {
						constructor(e) {
							this._doc = e
						}
						getTitle() {
							return this._doc.title
						}
						setTitle(e) {
							this._doc.title = e || ""
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(oe))
					}, t.\u0275prov = E({
						token: t,
						factory: function(e) {
							let r = null;
							return r = e ? new e : function OL() {
								return new wC(b(oe))
							}(), r
						},
						providedIn: "root"
					}), t
				})();
			typeof window < "u" && window;
			let Wl = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275prov = E({
						token: t,
						factory: function(e) {
							let r = null;
							return r = e ? new(e || t) : b(xC), r
						},
						providedIn: "root"
					}), t
				})(),
				xC = (() => {
					class t extends Wl {
						constructor(e) {
							super(), this._doc = e
						}
						sanitize(e, r) {
							if (null == r) return null;
							switch (e) {
								case ie.NONE:
									return r;
								case ie.HTML:
									return kn(r, "HTML") ? jt(r) : ry(this._doc, String(r)).toString();
								case ie.STYLE:
									return kn(r, "Style") ? jt(r) : r;
								case ie.SCRIPT:
									if (kn(r, "Script")) return jt(r);
									throw new Error("unsafe value used in a script context");
								case ie.URL:
									return kn(r, "URL") ? jt(r) : qa(String(r));
								case ie.RESOURCE_URL:
									if (kn(r, "ResourceURL")) return jt(r);
									throw new Error("unsafe value used in a resource URL context (see https://g.co/ng/security#xss)");
								default:
									throw new Error(`Unexpected SecurityContext ${e} (see https://g.co/ng/security#xss)`)
							}
						}
						bypassSecurityTrustHtml(e) {
							return function VS(t) {
								return new RS(t)
							}(e)
						}
						bypassSecurityTrustStyle(e) {
							return function BS(t) {
								return new OS(t)
							}(e)
						}
						bypassSecurityTrustScript(e) {
							return function HS(t) {
								return new kS(t)
							}(e)
						}
						bypassSecurityTrustUrl(e) {
							return function jS(t) {
								return new NS(t)
							}(e)
						}
						bypassSecurityTrustResourceUrl(e) {
							return function $S(t) {
								return new LS(t)
							}(e)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(oe))
					}, t.\u0275prov = E({
						token: t,
						factory: function(e) {
							let r = null;
							return r = e ? new e : function HL(t) {
								return new xC(t.get(oe))
							}(b(It)), r
						},
						providedIn: "root"
					}), t
				})();
			const {
				isArray: jL
			} = Array, {
				getPrototypeOf: $L,
				prototype: UL,
				keys: GL
			} = Object;

			function EC(t) {
				if (1 === t.length) {
					const n = t[0];
					if (jL(n)) return {
						args: n,
						keys: null
					};
					if (function zL(t) {
							return t && "object" == typeof t && $L(t) === UL
						}(n)) {
						const e = GL(n);
						return {
							args: e.map(r => n[r]),
							keys: e
						}
					}
				}
				return {
					args: t,
					keys: null
				}
			}
			const {
				isArray: WL
			} = Array;

			function xh(t) {
				return j(n => function qL(t, n) {
					return WL(n) ? t(...n) : t(n)
				}(t, n))
			}

			function MC(t, n) {
				return t.reduce((e, r, i) => (e[r] = n[i], e), {})
			}

			function AC(...t) {
				const n = $g(t),
					{
						args: e,
						keys: r
					} = EC(t),
					i = new Ce(s => {
						const {
							length: o
						} = e;
						if (!o) return void s.complete();
						const a = new Array(o);
						let l = o,
							u = o;
						for (let c = 0; c < o; c++) {
							let d = !1;
							Ot(e[c]).subscribe(Oe(s, f => {
								d || (d = !0, u--), a[c] = f
							}, () => l--, void 0, () => {
								(!l || !d) && (u || s.next(r ? MC(r, a) : a), s.complete())
							}))
						}
					});
				return n ? i.pipe(xh(n)) : i
			}

			function Rr(t) {
				return null == t || ("string" == typeof t || Array.isArray(t)) && 0 === t.length
			}

			function TC(t) {
				return null != t && "number" == typeof t.length
			}
			const dt = new S("NgValidators"),
				Or = new S("NgAsyncValidators"),
				JL = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			class eP {
				static min(n) {
					return function FC(t) {
						return n => {
							if (Rr(n.value) || Rr(t)) return null;
							const e = parseFloat(n.value);
							return !isNaN(e) && e < t ? {
								min: {
									min: t,
									actual: n.value
								}
							} : null
						}
					}(n)
				}
				static max(n) {
					return function RC(t) {
						return n => {
							if (Rr(n.value) || Rr(t)) return null;
							const e = parseFloat(n.value);
							return !isNaN(e) && e > t ? {
								max: {
									max: t,
									actual: n.value
								}
							} : null
						}
					}(n)
				}
				static required(n) {
					return function OC(t) {
						return Rr(t.value) ? {
							required: !0
						} : null
					}(n)
				}
				static requiredTrue(n) {
					return function kC(t) {
						return !0 === t.value ? null : {
							required: !0
						}
					}(n)
				}
				static email(n) {
					return function NC(t) {
						return Rr(t.value) || JL.test(t.value) ? null : {
							email: !0
						}
					}(n)
				}
				static minLength(n) {
					return function LC(t) {
						return n => Rr(n.value) || !TC(n.value) ? null : n.value.length < t ? {
							minlength: {
								requiredLength: t,
								actualLength: n.value.length
							}
						} : null
					}(n)
				}
				static maxLength(n) {
					return function PC(t) {
						return n => TC(n.value) && n.value.length > t ? {
							maxlength: {
								requiredLength: t,
								actualLength: n.value.length
							}
						} : null
					}(n)
				}
				static pattern(n) {
					return function VC(t) {
						if (!t) return ql;
						let n, e;
						return "string" == typeof t ? (e = "", "^" !== t.charAt(0) && (e += "^"), e += t, "$" !== t.charAt(t.length - 1) && (e += "$"), n = new RegExp(e)) : (e = t.toString(), n = t), r => {
							if (Rr(r.value)) return null;
							const i = r.value;
							return n.test(i) ? null : {
								pattern: {
									requiredPattern: e,
									actualValue: i
								}
							}
						}
					}(n)
				}
				static nullValidator(n) {
					return null
				}
				static compose(n) {
					return GC(n)
				}
				static composeAsync(n) {
					return zC(n)
				}
			}

			function ql(t) {
				return null
			}

			function BC(t) {
				return null != t
			}

			function HC(t) {
				return go(t) ? $e(t) : t
			}

			function jC(t) {
				let n = {};
				return t.forEach(e => {
					n = null != e ? {
						...n,
						...e
					} : n
				}), 0 === Object.keys(n).length ? null : n
			}

			function $C(t, n) {
				return n.map(e => e(t))
			}

			function UC(t) {
				return t.map(n => function tP(t) {
					return !t.validate
				}(n) ? n : e => n.validate(e))
			}

			function GC(t) {
				if (!t) return null;
				const n = t.filter(BC);
				return 0 == n.length ? null : function(e) {
					return jC($C(e, n))
				}
			}

			function Mh(t) {
				return null != t ? GC(UC(t)) : null
			}

			function zC(t) {
				if (!t) return null;
				const n = t.filter(BC);
				return 0 == n.length ? null : function(e) {
					return AC($C(e, n).map(HC)).pipe(j(jC))
				}
			}

			function Ah(t) {
				return null != t ? zC(UC(t)) : null
			}

			function WC(t, n) {
				return null === t ? [n] : Array.isArray(t) ? [...t, n] : [t, n]
			}

			function qC(t) {
				return t._rawValidators
			}

			function KC(t) {
				return t._rawAsyncValidators
			}

			function Sh(t) {
				return t ? Array.isArray(t) ? t : [t] : []
			}

			function Kl(t, n) {
				return Array.isArray(t) ? t.includes(n) : t === n
			}

			function QC(t, n) {
				const e = Sh(n);
				return Sh(t).forEach(i => {
					Kl(e, i) || e.push(i)
				}), e
			}

			function YC(t, n) {
				return Sh(n).filter(e => !Kl(t, e))
			}
			class ZC {
				constructor() {
					this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
				}
				get value() {
					return this.control ? this.control.value : null
				}
				get valid() {
					return this.control ? this.control.valid : null
				}
				get invalid() {
					return this.control ? this.control.invalid : null
				}
				get pending() {
					return this.control ? this.control.pending : null
				}
				get disabled() {
					return this.control ? this.control.disabled : null
				}
				get enabled() {
					return this.control ? this.control.enabled : null
				}
				get errors() {
					return this.control ? this.control.errors : null
				}
				get pristine() {
					return this.control ? this.control.pristine : null
				}
				get dirty() {
					return this.control ? this.control.dirty : null
				}
				get touched() {
					return this.control ? this.control.touched : null
				}
				get status() {
					return this.control ? this.control.status : null
				}
				get untouched() {
					return this.control ? this.control.untouched : null
				}
				get statusChanges() {
					return this.control ? this.control.statusChanges : null
				}
				get valueChanges() {
					return this.control ? this.control.valueChanges : null
				}
				get path() {
					return null
				}
				_setValidators(n) {
					this._rawValidators = n || [], this._composedValidatorFn = Mh(this._rawValidators)
				}
				_setAsyncValidators(n) {
					this._rawAsyncValidators = n || [], this._composedAsyncValidatorFn = Ah(this._rawAsyncValidators)
				}
				get validator() {
					return this._composedValidatorFn || null
				}
				get asyncValidator() {
					return this._composedAsyncValidatorFn || null
				}
				_registerOnDestroy(n) {
					this._onDestroyCallbacks.push(n)
				}
				_invokeOnDestroyCallbacks() {
					this._onDestroyCallbacks.forEach(n => n()), this._onDestroyCallbacks = []
				}
				reset(n) {
					this.control && this.control.reset(n)
				}
				hasError(n, e) {
					return !!this.control && this.control.hasError(n, e)
				}
				getError(n, e) {
					return this.control ? this.control.getError(n, e) : null
				}
			}
			class xt extends ZC {
				get formDirective() {
					return null
				}
				get path() {
					return null
				}
			}
			class ur extends ZC {
				constructor() {
					super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
				}
			}
			let JC = (() => {
				class t extends class XC {
					constructor(n) {
						this._cd = n
					}
					get isTouched() {
						return !!this._cd?.control?.touched
					}
					get isUntouched() {
						return !!this._cd?.control?.untouched
					}
					get isPristine() {
						return !!this._cd?.control?.pristine
					}
					get isDirty() {
						return !!this._cd?.control?.dirty
					}
					get isValid() {
						return !!this._cd?.control?.valid
					}
					get isInvalid() {
						return !!this._cd?.control?.invalid
					}
					get isPending() {
						return !!this._cd?.control?.pending
					}
					get isSubmitted() {
						return !!this._cd?.submitted
					}
				} {
					constructor(e) {
						super(e)
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(p(xt, 10))
				}, t.\u0275dir = x({
					type: t,
					selectors: [
						["", "formGroupName", ""],
						["", "formArrayName", ""],
						["", "ngModelGroup", ""],
						["", "formGroup", ""],
						["form", 3, "ngNoForm", ""],
						["", "ngForm", ""]
					],
					hostVars: 16,
					hostBindings: function(e, r) {
						2 & e && Ft("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)("ng-pristine", r.isPristine)("ng-dirty", r.isDirty)("ng-valid", r.isValid)("ng-invalid", r.isInvalid)("ng-pending", r.isPending)("ng-submitted", r.isSubmitted)
					},
					features: [M]
				}), t
			})();
			const ko = "VALID",
				Yl = "INVALID",
				ms = "PENDING",
				No = "DISABLED";

			function Rh(t) {
				return (Zl(t) ? t.validators : t) || null
			}

			function tD(t) {
				return Array.isArray(t) ? Mh(t) : t || null
			}

			function Oh(t, n) {
				return (Zl(n) ? n.asyncValidators : t) || null
			}

			function nD(t) {
				return Array.isArray(t) ? Ah(t) : t || null
			}

			function Zl(t) {
				return null != t && !Array.isArray(t) && "object" == typeof t
			}
			class sD {
				constructor(n, e) {
					this._pendingDirty = !1, this._hasOwnPendingAsyncValidator = !1, this._pendingTouched = !1, this._onCollectionChange = () => {}, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._rawValidators = n, this._rawAsyncValidators = e, this._composedValidatorFn = tD(this._rawValidators), this._composedAsyncValidatorFn = nD(this._rawAsyncValidators)
				}
				get validator() {
					return this._composedValidatorFn
				}
				set validator(n) {
					this._rawValidators = this._composedValidatorFn = n
				}
				get asyncValidator() {
					return this._composedAsyncValidatorFn
				}
				set asyncValidator(n) {
					this._rawAsyncValidators = this._composedAsyncValidatorFn = n
				}
				get parent() {
					return this._parent
				}
				get valid() {
					return this.status === ko
				}
				get invalid() {
					return this.status === Yl
				}
				get pending() {
					return this.status == ms
				}
				get disabled() {
					return this.status === No
				}
				get enabled() {
					return this.status !== No
				}
				get dirty() {
					return !this.pristine
				}
				get untouched() {
					return !this.touched
				}
				get updateOn() {
					return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
				}
				setValidators(n) {
					this._rawValidators = n, this._composedValidatorFn = tD(n)
				}
				setAsyncValidators(n) {
					this._rawAsyncValidators = n, this._composedAsyncValidatorFn = nD(n)
				}
				addValidators(n) {
					this.setValidators(QC(n, this._rawValidators))
				}
				addAsyncValidators(n) {
					this.setAsyncValidators(QC(n, this._rawAsyncValidators))
				}
				removeValidators(n) {
					this.setValidators(YC(n, this._rawValidators))
				}
				removeAsyncValidators(n) {
					this.setAsyncValidators(YC(n, this._rawAsyncValidators))
				}
				hasValidator(n) {
					return Kl(this._rawValidators, n)
				}
				hasAsyncValidator(n) {
					return Kl(this._rawAsyncValidators, n)
				}
				clearValidators() {
					this.validator = null
				}
				clearAsyncValidators() {
					this.asyncValidator = null
				}
				markAsTouched(n = {}) {
					this.touched = !0, this._parent && !n.onlySelf && this._parent.markAsTouched(n)
				}
				markAllAsTouched() {
					this.markAsTouched({
						onlySelf: !0
					}), this._forEachChild(n => n.markAllAsTouched())
				}
				markAsUntouched(n = {}) {
					this.touched = !1, this._pendingTouched = !1, this._forEachChild(e => {
						e.markAsUntouched({
							onlySelf: !0
						})
					}), this._parent && !n.onlySelf && this._parent._updateTouched(n)
				}
				markAsDirty(n = {}) {
					this.pristine = !1, this._parent && !n.onlySelf && this._parent.markAsDirty(n)
				}
				markAsPristine(n = {}) {
					this.pristine = !0, this._pendingDirty = !1, this._forEachChild(e => {
						e.markAsPristine({
							onlySelf: !0
						})
					}), this._parent && !n.onlySelf && this._parent._updatePristine(n)
				}
				markAsPending(n = {}) {
					this.status = ms, !1 !== n.emitEvent && this.statusChanges.emit(this.status), this._parent && !n.onlySelf && this._parent.markAsPending(n)
				}
				disable(n = {}) {
					const e = this._parentMarkedDirty(n.onlySelf);
					this.status = No, this.errors = null, this._forEachChild(r => {
						r.disable({
							...n,
							onlySelf: !0
						})
					}), this._updateValue(), !1 !== n.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors({
						...n,
						skipPristineCheck: e
					}), this._onDisabledChange.forEach(r => r(!0))
				}
				enable(n = {}) {
					const e = this._parentMarkedDirty(n.onlySelf);
					this.status = ko, this._forEachChild(r => {
						r.enable({
							...n,
							onlySelf: !0
						})
					}), this.updateValueAndValidity({
						onlySelf: !0,
						emitEvent: n.emitEvent
					}), this._updateAncestors({
						...n,
						skipPristineCheck: e
					}), this._onDisabledChange.forEach(r => r(!1))
				}
				_updateAncestors(n) {
					this._parent && !n.onlySelf && (this._parent.updateValueAndValidity(n), n.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
				}
				setParent(n) {
					this._parent = n
				}
				getRawValue() {
					return this.value
				}
				updateValueAndValidity(n = {}) {
					this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), (this.status === ko || this.status === ms) && this._runAsyncValidator(n.emitEvent)), !1 !== n.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !n.onlySelf && this._parent.updateValueAndValidity(n)
				}
				_updateTreeValidity(n = {
					emitEvent: !0
				}) {
					this._forEachChild(e => e._updateTreeValidity(n)), this.updateValueAndValidity({
						onlySelf: !0,
						emitEvent: n.emitEvent
					})
				}
				_setInitialStatus() {
					this.status = this._allControlsDisabled() ? No : ko
				}
				_runValidator() {
					return this.validator ? this.validator(this) : null
				}
				_runAsyncValidator(n) {
					if (this.asyncValidator) {
						this.status = ms, this._hasOwnPendingAsyncValidator = !0;
						const e = HC(this.asyncValidator(this));
						this._asyncValidationSubscription = e.subscribe(r => {
							this._hasOwnPendingAsyncValidator = !1, this.setErrors(r, {
								emitEvent: n
							})
						})
					}
				}
				_cancelExistingSubscription() {
					this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
				}
				setErrors(n, e = {}) {
					this.errors = n, this._updateControlsErrors(!1 !== e.emitEvent)
				}
				get(n) {
					let e = n;
					return null == e || (Array.isArray(e) || (e = e.split(".")), 0 === e.length) ? null : e.reduce((r, i) => r && r._find(i), this)
				}
				getError(n, e) {
					const r = e ? this.get(e) : this;
					return r && r.errors ? r.errors[n] : null
				}
				hasError(n, e) {
					return !!this.getError(n, e)
				}
				get root() {
					let n = this;
					for (; n._parent;) n = n._parent;
					return n
				}
				_updateControlsErrors(n) {
					this.status = this._calculateStatus(), n && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(n)
				}
				_initObservables() {
					this.valueChanges = new Me, this.statusChanges = new Me
				}
				_calculateStatus() {
					return this._allControlsDisabled() ? No : this.errors ? Yl : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(ms) ? ms : this._anyControlsHaveStatus(Yl) ? Yl : ko
				}
				_anyControlsHaveStatus(n) {
					return this._anyControls(e => e.status === n)
				}
				_anyControlsDirty() {
					return this._anyControls(n => n.dirty)
				}
				_anyControlsTouched() {
					return this._anyControls(n => n.touched)
				}
				_updatePristine(n = {}) {
					this.pristine = !this._anyControlsDirty(), this._parent && !n.onlySelf && this._parent._updatePristine(n)
				}
				_updateTouched(n = {}) {
					this.touched = this._anyControlsTouched(), this._parent && !n.onlySelf && this._parent._updateTouched(n)
				}
				_registerOnCollectionChange(n) {
					this._onCollectionChange = n
				}
				_setUpdateStrategy(n) {
					Zl(n) && null != n.updateOn && (this._updateOn = n.updateOn)
				}
				_parentMarkedDirty(n) {
					return !n && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
				}
				_find(n) {
					return null
				}
			}
			class kh extends sD {
				constructor(n, e, r) {
					super(Rh(e), Oh(r, e)), this.controls = n, this._initObservables(), this._setUpdateStrategy(e), this._setUpControls(), this.updateValueAndValidity({
						onlySelf: !0,
						emitEvent: !!this.asyncValidator
					})
				}
				registerControl(n, e) {
					return this.controls[n] ? this.controls[n] : (this.controls[n] = e, e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange), e)
				}
				addControl(n, e, r = {}) {
					this.registerControl(n, e), this.updateValueAndValidity({
						emitEvent: r.emitEvent
					}), this._onCollectionChange()
				}
				removeControl(n, e = {}) {
					this.controls[n] && this.controls[n]._registerOnCollectionChange(() => {}), delete this.controls[n], this.updateValueAndValidity({
						emitEvent: e.emitEvent
					}), this._onCollectionChange()
				}
				setControl(n, e, r = {}) {
					this.controls[n] && this.controls[n]._registerOnCollectionChange(() => {}), delete this.controls[n], e && this.registerControl(n, e), this.updateValueAndValidity({
						emitEvent: r.emitEvent
					}), this._onCollectionChange()
				}
				contains(n) {
					return this.controls.hasOwnProperty(n) && this.controls[n].enabled
				}
				setValue(n, e = {}) {
					(function iD(t, n, e) {
						t._forEachChild((r, i) => {
							if (void 0 === e[i]) throw new w(1002, "")
						})
					})(this, 0, n), Object.keys(n).forEach(r => {
						(function rD(t, n, e) {
							const r = t.controls;
							if (!(n ? Object.keys(r) : r).length) throw new w(1e3, "");
							if (!r[e]) throw new w(1001, "")
						})(this, !0, r), this.controls[r].setValue(n[r], {
							onlySelf: !0,
							emitEvent: e.emitEvent
						})
					}), this.updateValueAndValidity(e)
				}
				patchValue(n, e = {}) {
					null != n && (Object.keys(n).forEach(r => {
						const i = this.controls[r];
						i && i.patchValue(n[r], {
							onlySelf: !0,
							emitEvent: e.emitEvent
						})
					}), this.updateValueAndValidity(e))
				}
				reset(n = {}, e = {}) {
					this._forEachChild((r, i) => {
						r.reset(n[i], {
							onlySelf: !0,
							emitEvent: e.emitEvent
						})
					}), this._updatePristine(e), this._updateTouched(e), this.updateValueAndValidity(e)
				}
				getRawValue() {
					return this._reduceChildren({}, (n, e, r) => (n[r] = e.getRawValue(), n))
				}
				_syncPendingControls() {
					let n = this._reduceChildren(!1, (e, r) => !!r._syncPendingControls() || e);
					return n && this.updateValueAndValidity({
						onlySelf: !0
					}), n
				}
				_forEachChild(n) {
					Object.keys(this.controls).forEach(e => {
						const r = this.controls[e];
						r && n(r, e)
					})
				}
				_setUpControls() {
					this._forEachChild(n => {
						n.setParent(this), n._registerOnCollectionChange(this._onCollectionChange)
					})
				}
				_updateValue() {
					this.value = this._reduceValue()
				}
				_anyControls(n) {
					for (const [e, r] of Object.entries(this.controls))
						if (this.contains(e) && n(r)) return !0;
					return !1
				}
				_reduceValue() {
					return this._reduceChildren({}, (e, r, i) => ((r.enabled || this.disabled) && (e[i] = r.value), e))
				}
				_reduceChildren(n, e) {
					let r = n;
					return this._forEachChild((i, s) => {
						r = e(r, i, s)
					}), r
				}
				_allControlsDisabled() {
					for (const n of Object.keys(this.controls))
						if (this.controls[n].enabled) return !1;
					return Object.keys(this.controls).length > 0 || this.disabled
				}
				_find(n) {
					return this.controls.hasOwnProperty(n) ? this.controls[n] : null
				}
			}

			function Lo(t, n) {
				Nh(t, n), n.valueAccessor.writeValue(t.value), t.disabled && n.valueAccessor.setDisabledState?.(!0),
					function dP(t, n) {
						n.valueAccessor.registerOnChange(e => {
							t._pendingValue = e, t._pendingChange = !0, t._pendingDirty = !0, "change" === t.updateOn && oD(t, n)
						})
					}(t, n),
					function hP(t, n) {
						const e = (r, i) => {
							n.valueAccessor.writeValue(r), i && n.viewToModelUpdate(r)
						};
						t.registerOnChange(e), n._registerOnDestroy(() => {
							t._unregisterOnChange(e)
						})
					}(t, n),
					function fP(t, n) {
						n.valueAccessor.registerOnTouched(() => {
							t._pendingTouched = !0, "blur" === t.updateOn && t._pendingChange && oD(t, n), "submit" !== t.updateOn && t.markAsTouched()
						})
					}(t, n),
					function cP(t, n) {
						if (n.valueAccessor.setDisabledState) {
							const e = r => {
								n.valueAccessor.setDisabledState(r)
							};
							t.registerOnDisabledChange(e), n._registerOnDestroy(() => {
								t._unregisterOnDisabledChange(e)
							})
						}
					}(t, n)
			}

			function Jl(t, n, e = !0) {
				const r = () => {};
				n.valueAccessor && (n.valueAccessor.registerOnChange(r), n.valueAccessor.registerOnTouched(r)), tu(t, n), t && (n._invokeOnDestroyCallbacks(), t._registerOnCollectionChange(() => {}))
			}

			function eu(t, n) {
				t.forEach(e => {
					e.registerOnValidatorChange && e.registerOnValidatorChange(n)
				})
			}

			function Nh(t, n) {
				const e = qC(t);
				null !== n.validator ? t.setValidators(WC(e, n.validator)) : "function" == typeof e && t.setValidators([e]);
				const r = KC(t);
				null !== n.asyncValidator ? t.setAsyncValidators(WC(r, n.asyncValidator)) : "function" == typeof r && t.setAsyncValidators([r]);
				const i = () => t.updateValueAndValidity();
				eu(n._rawValidators, i), eu(n._rawAsyncValidators, i)
			}

			function tu(t, n) {
				let e = !1;
				if (null !== t) {
					if (null !== n.validator) {
						const i = qC(t);
						if (Array.isArray(i) && i.length > 0) {
							const s = i.filter(o => o !== n.validator);
							s.length !== i.length && (e = !0, t.setValidators(s))
						}
					}
					if (null !== n.asyncValidator) {
						const i = KC(t);
						if (Array.isArray(i) && i.length > 0) {
							const s = i.filter(o => o !== n.asyncValidator);
							s.length !== i.length && (e = !0, t.setAsyncValidators(s))
						}
					}
				}
				const r = () => {};
				return eu(n._rawValidators, r), eu(n._rawAsyncValidators, r), e
			}

			function oD(t, n) {
				t._pendingDirty && t.markAsDirty(), t.setValue(t._pendingValue, {
					emitModelToViewChange: !1
				}), n.viewToModelUpdate(t._pendingValue), t._pendingChange = !1
			}

			function aD(t, n) {
				Nh(t, n)
			}

			function uD(t, n) {
				t._syncPendingControls(), n.forEach(e => {
					const r = e.control;
					"submit" === r.updateOn && r._pendingChange && (e.viewToModelUpdate(r._pendingValue), r._pendingChange = !1)
				})
			}
			const _P = {
					provide: xt,
					useExisting: ye(() => Vo)
				},
				Po = (() => Promise.resolve())();
			let Vo = (() => {
				class t extends xt {
					constructor(e, r) {
						super(), this.submitted = !1, this._directives = new Set, this.ngSubmit = new Me, this.form = new kh({}, Mh(e), Ah(r))
					}
					ngAfterViewInit() {
						this._setUpdateStrategy()
					}
					get formDirective() {
						return this
					}
					get control() {
						return this.form
					}
					get path() {
						return []
					}
					get controls() {
						return this.form.controls
					}
					addControl(e) {
						Po.then(() => {
							const r = this._findContainer(e.path);
							e.control = r.registerControl(e.name, e.control), Lo(e.control, e), e.control.updateValueAndValidity({
								emitEvent: !1
							}), this._directives.add(e)
						})
					}
					getControl(e) {
						return this.form.get(e.path)
					}
					removeControl(e) {
						Po.then(() => {
							const r = this._findContainer(e.path);
							r && r.removeControl(e.name), this._directives.delete(e)
						})
					}
					addFormGroup(e) {
						Po.then(() => {
							const r = this._findContainer(e.path),
								i = new kh({});
							aD(i, e), r.registerControl(e.name, i), i.updateValueAndValidity({
								emitEvent: !1
							})
						})
					}
					removeFormGroup(e) {
						Po.then(() => {
							const r = this._findContainer(e.path);
							r && r.removeControl(e.name)
						})
					}
					getFormGroup(e) {
						return this.form.get(e.path)
					}
					updateModel(e, r) {
						Po.then(() => {
							this.form.get(e.path).setValue(r)
						})
					}
					setValue(e) {
						this.control.setValue(e)
					}
					onSubmit(e) {
						return this.submitted = !0, uD(this.form, this._directives), this.ngSubmit.emit(e), "dialog" === e?.target?.method
					}
					onReset() {
						this.resetForm()
					}
					resetForm(e) {
						this.form.reset(e), this.submitted = !1
					}
					_setUpdateStrategy() {
						this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn)
					}
					_findContainer(e) {
						return e.pop(), e.length ? this.form.get(e) : this.form
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(p(dt, 10), p(Or, 10))
				}, t.\u0275dir = x({
					type: t,
					selectors: [
						["form", 3, "ngNoForm", "", 3, "formGroup", ""],
						["ng-form"],
						["", "ngForm", ""]
					],
					hostBindings: function(e, r) {
						1 & e && Ze("submit", function(s) {
							return r.onSubmit(s)
						})("reset", function() {
							return r.onReset()
						})
					},
					inputs: {
						options: ["ngFormOptions", "options"]
					},
					outputs: {
						ngSubmit: "ngSubmit"
					},
					exportAs: ["ngForm"],
					features: [be([_P]), M]
				}), t
			})();

			function cD(t, n) {
				const e = t.indexOf(n);
				e > -1 && t.splice(e, 1)
			}

			function dD(t) {
				return "object" == typeof t && null !== t && 2 === Object.keys(t).length && "value" in t && "disabled" in t
			}
			const fD = class extends sD {
				constructor(n = null, e, r) {
					super(Rh(e), Oh(r, e)), this.defaultValue = null, this._onChange = [], this._pendingChange = !1, this._applyFormState(n), this._setUpdateStrategy(e), this._initObservables(), this.updateValueAndValidity({
						onlySelf: !0,
						emitEvent: !!this.asyncValidator
					}), Zl(e) && (e.nonNullable || e.initialValueIsDefault) && (this.defaultValue = dD(n) ? n.value : n)
				}
				setValue(n, e = {}) {
					this.value = this._pendingValue = n, this._onChange.length && !1 !== e.emitModelToViewChange && this._onChange.forEach(r => r(this.value, !1 !== e.emitViewToModelChange)), this.updateValueAndValidity(e)
				}
				patchValue(n, e = {}) {
					this.setValue(n, e)
				}
				reset(n = this.defaultValue, e = {}) {
					this._applyFormState(n), this.markAsPristine(e), this.markAsUntouched(e), this.setValue(this.value, e), this._pendingChange = !1
				}
				_updateValue() {}
				_anyControls(n) {
					return !1
				}
				_allControlsDisabled() {
					return this.disabled
				}
				registerOnChange(n) {
					this._onChange.push(n)
				}
				_unregisterOnChange(n) {
					cD(this._onChange, n)
				}
				registerOnDisabledChange(n) {
					this._onDisabledChange.push(n)
				}
				_unregisterOnDisabledChange(n) {
					cD(this._onDisabledChange, n)
				}
				_forEachChild(n) {}
				_syncPendingControls() {
					return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
						onlySelf: !0,
						emitModelToViewChange: !1
					}), 0))
				}
				_applyFormState(n) {
					dD(n) ? (this.value = this._pendingValue = n.value, n.disabled ? this.disable({
						onlySelf: !0,
						emitEvent: !1
					}) : this.enable({
						onlySelf: !0,
						emitEvent: !1
					})) : this.value = this._pendingValue = n
				}
			};
			let yD = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]
						],
						hostAttrs: ["novalidate", ""]
					}), t
				})(),
				vD = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({}), t
				})();
			const AP = {
				provide: xt,
				useExisting: ye(() => nu)
			};
			let nu = (() => {
					class t extends xt {
						constructor(e, r) {
							super(), this.submitted = !1, this._onCollectionChange = () => this._updateDomValue(), this.directives = [], this.form = null, this.ngSubmit = new Me, this._setValidators(e), this._setAsyncValidators(r)
						}
						ngOnChanges(e) {
							this._checkFormPresent(), e.hasOwnProperty("form") && (this._updateValidators(), this._updateDomValue(), this._updateRegistrations(), this._oldForm = this.form)
						}
						ngOnDestroy() {
							this.form && (tu(this.form, this), this.form._onCollectionChange === this._onCollectionChange && this.form._registerOnCollectionChange(() => {}))
						}
						get formDirective() {
							return this
						}
						get control() {
							return this.form
						}
						get path() {
							return []
						}
						addControl(e) {
							const r = this.form.get(e.path);
							return Lo(r, e), r.updateValueAndValidity({
								emitEvent: !1
							}), this.directives.push(e), r
						}
						getControl(e) {
							return this.form.get(e.path)
						}
						removeControl(e) {
							Jl(e.control || null, e, !1),
								function yP(t, n) {
									const e = t.indexOf(n);
									e > -1 && t.splice(e, 1)
								}(this.directives, e)
						}
						addFormGroup(e) {
							this._setUpFormContainer(e)
						}
						removeFormGroup(e) {
							this._cleanUpFormContainer(e)
						}
						getFormGroup(e) {
							return this.form.get(e.path)
						}
						addFormArray(e) {
							this._setUpFormContainer(e)
						}
						removeFormArray(e) {
							this._cleanUpFormContainer(e)
						}
						getFormArray(e) {
							return this.form.get(e.path)
						}
						updateModel(e, r) {
							this.form.get(e.path).setValue(r)
						}
						onSubmit(e) {
							return this.submitted = !0, uD(this.form, this.directives), this.ngSubmit.emit(e), "dialog" === e?.target?.method
						}
						onReset() {
							this.resetForm()
						}
						resetForm(e) {
							this.form.reset(e), this.submitted = !1
						}
						_updateDomValue() {
							this.directives.forEach(e => {
								const r = e.control,
									i = this.form.get(e.path);
								r !== i && (Jl(r || null, e), (t => t instanceof fD)(i) && (Lo(i, e), e.control = i))
							}), this.form._updateTreeValidity({
								emitEvent: !1
							})
						}
						_setUpFormContainer(e) {
							const r = this.form.get(e.path);
							aD(r, e), r.updateValueAndValidity({
								emitEvent: !1
							})
						}
						_cleanUpFormContainer(e) {
							if (this.form) {
								const r = this.form.get(e.path);
								r && function pP(t, n) {
									return tu(t, n)
								}(r, e) && r.updateValueAndValidity({
									emitEvent: !1
								})
							}
						}
						_updateRegistrations() {
							this.form._registerOnCollectionChange(this._onCollectionChange), this._oldForm && this._oldForm._registerOnCollectionChange(() => {})
						}
						_updateValidators() {
							Nh(this.form, this), this._oldForm && tu(this._oldForm, this)
						}
						_checkFormPresent() {}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(dt, 10), p(Or, 10))
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["", "formGroup", ""]
						],
						hostBindings: function(e, r) {
							1 & e && Ze("submit", function(s) {
								return r.onSubmit(s)
							})("reset", function() {
								return r.onReset()
							})
						},
						inputs: {
							form: ["formGroup", "form"]
						},
						outputs: {
							ngSubmit: "ngSubmit"
						},
						exportAs: ["ngForm"],
						features: [be([AP]), M, mt]
					}), t
				})(),
				zP = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [vD]
					}), t
				})(),
				WP = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [zP]
					}), t
				})();

			function O(...t) {
				return $e(t, Ls(t))
			}

			function kr(t, n) {
				return ne(n) ? nt(t, n, 1) : nt(t, 1)
			}

			function Gt(t, n) {
				return Ve((e, r) => {
					let i = 0;
					e.subscribe(Oe(r, s => t.call(n, s, i++) && r.next(s)))
				})
			}
			class PD {}
			class VD {}
			class cr {
				constructor(n) {
					this.normalizedNames = new Map, this.lazyUpdate = null, n ? this.lazyInit = "string" == typeof n ? () => {
						this.headers = new Map, n.split("\n").forEach(e => {
							const r = e.indexOf(":");
							if (r > 0) {
								const i = e.slice(0, r),
									s = i.toLowerCase(),
									o = e.slice(r + 1).trim();
								this.maybeSetNormalizedName(i, s), this.headers.has(s) ? this.headers.get(s).push(o) : this.headers.set(s, [o])
							}
						})
					} : () => {
						this.headers = new Map, Object.keys(n).forEach(e => {
							let r = n[e];
							const i = e.toLowerCase();
							"string" == typeof r && (r = [r]), r.length > 0 && (this.headers.set(i, r), this.maybeSetNormalizedName(e, i))
						})
					} : this.headers = new Map
				}
				has(n) {
					return this.init(), this.headers.has(n.toLowerCase())
				}
				get(n) {
					this.init();
					const e = this.headers.get(n.toLowerCase());
					return e && e.length > 0 ? e[0] : null
				}
				keys() {
					return this.init(), Array.from(this.normalizedNames.values())
				}
				getAll(n) {
					return this.init(), this.headers.get(n.toLowerCase()) || null
				}
				append(n, e) {
					return this.clone({
						name: n,
						value: e,
						op: "a"
					})
				}
				set(n, e) {
					return this.clone({
						name: n,
						value: e,
						op: "s"
					})
				}
				delete(n, e) {
					return this.clone({
						name: n,
						value: e,
						op: "d"
					})
				}
				maybeSetNormalizedName(n, e) {
					this.normalizedNames.has(e) || this.normalizedNames.set(e, n)
				}
				init() {
					this.lazyInit && (this.lazyInit instanceof cr ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(n => this.applyUpdate(n)), this.lazyUpdate = null))
				}
				copyFrom(n) {
					n.init(), Array.from(n.headers.keys()).forEach(e => {
						this.headers.set(e, n.headers.get(e)), this.normalizedNames.set(e, n.normalizedNames.get(e))
					})
				}
				clone(n) {
					const e = new cr;
					return e.lazyInit = this.lazyInit && this.lazyInit instanceof cr ? this.lazyInit : this, e.lazyUpdate = (this.lazyUpdate || []).concat([n]), e
				}
				applyUpdate(n) {
					const e = n.name.toLowerCase();
					switch (n.op) {
						case "a":
						case "s":
							let r = n.value;
							if ("string" == typeof r && (r = [r]), 0 === r.length) return;
							this.maybeSetNormalizedName(n.name, e);
							const i = ("a" === n.op ? this.headers.get(e) : void 0) || [];
							i.push(...r), this.headers.set(e, i);
							break;
						case "d":
							const s = n.value;
							if (s) {
								let o = this.headers.get(e);
								if (!o) return;
								o = o.filter(a => -1 === s.indexOf(a)), 0 === o.length ? (this.headers.delete(e), this.normalizedNames.delete(e)) : this.headers.set(e, o)
							} else this.headers.delete(e), this.normalizedNames.delete(e)
					}
				}
				forEach(n) {
					this.init(), Array.from(this.normalizedNames.keys()).forEach(e => n(this.normalizedNames.get(e), this.headers.get(e)))
				}
			}
			class KP {
				encodeKey(n) {
					return BD(n)
				}
				encodeValue(n) {
					return BD(n)
				}
				decodeKey(n) {
					return decodeURIComponent(n)
				}
				decodeValue(n) {
					return decodeURIComponent(n)
				}
			}
			const YP = /%(\d[a-f0-9])/gi,
				ZP = {
					40: "@",
					"3A": ":",
					24: "$",
					"2C": ",",
					"3B": ";",
					"3D": "=",
					"3F": "?",
					"2F": "/"
				};

			function BD(t) {
				return encodeURIComponent(t).replace(YP, (n, e) => ZP[e] ?? n)
			}

			function ru(t) {
				return `${t}`
			}
			class Nr {
				constructor(n = {}) {
					if (this.updates = null, this.cloneFrom = null, this.encoder = n.encoder || new KP, n.fromString) {
						if (n.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
						this.map = function QP(t, n) {
							const e = new Map;
							return t.length > 0 && t.replace(/^\?/, "").split("&").forEach(i => {
								const s = i.indexOf("="),
									[o, a] = -1 == s ? [n.decodeKey(i), ""] : [n.decodeKey(i.slice(0, s)), n.decodeValue(i.slice(s + 1))],
									l = e.get(o) || [];
								l.push(a), e.set(o, l)
							}), e
						}(n.fromString, this.encoder)
					} else n.fromObject ? (this.map = new Map, Object.keys(n.fromObject).forEach(e => {
						const r = n.fromObject[e],
							i = Array.isArray(r) ? r.map(ru) : [ru(r)];
						this.map.set(e, i)
					})) : this.map = null
				}
				has(n) {
					return this.init(), this.map.has(n)
				}
				get(n) {
					this.init();
					const e = this.map.get(n);
					return e ? e[0] : null
				}
				getAll(n) {
					return this.init(), this.map.get(n) || null
				}
				keys() {
					return this.init(), Array.from(this.map.keys())
				}
				append(n, e) {
					return this.clone({
						param: n,
						value: e,
						op: "a"
					})
				}
				appendAll(n) {
					const e = [];
					return Object.keys(n).forEach(r => {
						const i = n[r];
						Array.isArray(i) ? i.forEach(s => {
							e.push({
								param: r,
								value: s,
								op: "a"
							})
						}) : e.push({
							param: r,
							value: i,
							op: "a"
						})
					}), this.clone(e)
				}
				set(n, e) {
					return this.clone({
						param: n,
						value: e,
						op: "s"
					})
				}
				delete(n, e) {
					return this.clone({
						param: n,
						value: e,
						op: "d"
					})
				}
				toString() {
					return this.init(), this.keys().map(n => {
						const e = this.encoder.encodeKey(n);
						return this.map.get(n).map(r => e + "=" + this.encoder.encodeValue(r)).join("&")
					}).filter(n => "" !== n).join("&")
				}
				clone(n) {
					const e = new Nr({
						encoder: this.encoder
					});
					return e.cloneFrom = this.cloneFrom || this, e.updates = (this.updates || []).concat(n), e
				}
				init() {
					null === this.map && (this.map = new Map), null !== this.cloneFrom && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(n => this.map.set(n, this.cloneFrom.map.get(n))), this.updates.forEach(n => {
						switch (n.op) {
							case "a":
							case "s":
								const e = ("a" === n.op ? this.map.get(n.param) : void 0) || [];
								e.push(ru(n.value)), this.map.set(n.param, e);
								break;
							case "d":
								if (void 0 === n.value) {
									this.map.delete(n.param);
									break
								} {
									let r = this.map.get(n.param) || [];
									const i = r.indexOf(ru(n.value)); - 1 !== i && r.splice(i, 1), r.length > 0 ? this.map.set(n.param, r) : this.map.delete(n.param)
								}
						}
					}), this.cloneFrom = this.updates = null)
				}
			}
			class XP {
				constructor() {
					this.map = new Map
				}
				set(n, e) {
					return this.map.set(n, e), this
				}
				get(n) {
					return this.map.has(n) || this.map.set(n, n.defaultValue()), this.map.get(n)
				}
				delete(n) {
					return this.map.delete(n), this
				}
				has(n) {
					return this.map.has(n)
				}
				keys() {
					return this.map.keys()
				}
			}

			function HD(t) {
				return typeof ArrayBuffer < "u" && t instanceof ArrayBuffer
			}

			function jD(t) {
				return typeof Blob < "u" && t instanceof Blob
			}

			function $D(t) {
				return typeof FormData < "u" && t instanceof FormData
			}
			class Bo {
				constructor(n, e, r, i) {
					let s;
					if (this.url = e, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = n.toUpperCase(), function JP(t) {
							switch (t) {
								case "DELETE":
								case "GET":
								case "HEAD":
								case "OPTIONS":
								case "JSONP":
									return !1;
								default:
									return !0
							}
						}(this.method) || i ? (this.body = void 0 !== r ? r : null, s = i) : s = r, s && (this.reportProgress = !!s.reportProgress, this.withCredentials = !!s.withCredentials, s.responseType && (this.responseType = s.responseType), s.headers && (this.headers = s.headers), s.context && (this.context = s.context), s.params && (this.params = s.params)), this.headers || (this.headers = new cr), this.context || (this.context = new XP), this.params) {
						const o = this.params.toString();
						if (0 === o.length) this.urlWithParams = e;
						else {
							const a = e.indexOf("?");
							this.urlWithParams = e + (-1 === a ? "?" : a < e.length - 1 ? "&" : "") + o
						}
					} else this.params = new Nr, this.urlWithParams = e
				}
				serializeBody() {
					return null === this.body ? null : HD(this.body) || jD(this.body) || $D(this.body) || function eV(t) {
						return typeof URLSearchParams < "u" && t instanceof URLSearchParams
					}(this.body) || "string" == typeof this.body ? this.body : this.body instanceof Nr ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
				}
				detectContentTypeHeader() {
					return null === this.body || $D(this.body) ? null : jD(this.body) ? this.body.type || null : HD(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof Nr ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || "boolean" == typeof this.body ? "application/json" : null
				}
				clone(n = {}) {
					const e = n.method || this.method,
						r = n.url || this.url,
						i = n.responseType || this.responseType,
						s = void 0 !== n.body ? n.body : this.body,
						o = void 0 !== n.withCredentials ? n.withCredentials : this.withCredentials,
						a = void 0 !== n.reportProgress ? n.reportProgress : this.reportProgress;
					let l = n.headers || this.headers,
						u = n.params || this.params;
					const c = n.context ?? this.context;
					return void 0 !== n.setHeaders && (l = Object.keys(n.setHeaders).reduce((d, f) => d.set(f, n.setHeaders[f]), l)), n.setParams && (u = Object.keys(n.setParams).reduce((d, f) => d.set(f, n.setParams[f]), u)), new Bo(e, r, s, {
						params: u,
						headers: l,
						context: c,
						reportProgress: a,
						responseType: i,
						withCredentials: o
					})
				}
			}
			var We = (() => ((We = We || {})[We.Sent = 0] = "Sent", We[We.UploadProgress = 1] = "UploadProgress", We[We.ResponseHeader = 2] = "ResponseHeader", We[We.DownloadProgress = 3] = "DownloadProgress", We[We.Response = 4] = "Response", We[We.User = 5] = "User", We))();
			class Uh {
				constructor(n, e = 200, r = "OK") {
					this.headers = n.headers || new cr, this.status = void 0 !== n.status ? n.status : e, this.statusText = n.statusText || r, this.url = n.url || null, this.ok = this.status >= 200 && this.status < 300
				}
			}
			class Gh extends Uh {
				constructor(n = {}) {
					super(n), this.type = We.ResponseHeader
				}
				clone(n = {}) {
					return new Gh({
						headers: n.headers || this.headers,
						status: void 0 !== n.status ? n.status : this.status,
						statusText: n.statusText || this.statusText,
						url: n.url || this.url || void 0
					})
				}
			}
			class iu extends Uh {
				constructor(n = {}) {
					super(n), this.type = We.Response, this.body = void 0 !== n.body ? n.body : null
				}
				clone(n = {}) {
					return new iu({
						body: void 0 !== n.body ? n.body : this.body,
						headers: n.headers || this.headers,
						status: void 0 !== n.status ? n.status : this.status,
						statusText: n.statusText || this.statusText,
						url: n.url || this.url || void 0
					})
				}
			}
			class UD extends Uh {
				constructor(n) {
					super(n, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${n.url||"(unknown url)"}` : `Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`, this.error = n.error || null
				}
			}

			function zh(t, n) {
				return {
					body: n,
					headers: t.headers,
					context: t.context,
					observe: t.observe,
					params: t.params,
					reportProgress: t.reportProgress,
					responseType: t.responseType,
					withCredentials: t.withCredentials
				}
			}
			let Ho = (() => {
				class t {
					constructor(e) {
						this.handler = e
					}
					request(e, r, i = {}) {
						let s;
						if (e instanceof Bo) s = e;
						else {
							let l, u;
							l = i.headers instanceof cr ? i.headers : new cr(i.headers), i.params && (u = i.params instanceof Nr ? i.params : new Nr({
								fromObject: i.params
							})), s = new Bo(e, r, void 0 !== i.body ? i.body : null, {
								headers: l,
								context: i.context,
								params: u,
								reportProgress: i.reportProgress,
								responseType: i.responseType || "json",
								withCredentials: i.withCredentials
							})
						}
						const o = O(s).pipe(kr(l => this.handler.handle(l)));
						if (e instanceof Bo || "events" === i.observe) return o;
						const a = o.pipe(Gt(l => l instanceof iu));
						switch (i.observe || "body") {
							case "body":
								switch (s.responseType) {
									case "arraybuffer":
										return a.pipe(j(l => {
											if (null !== l.body && !(l.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
											return l.body
										}));
									case "blob":
										return a.pipe(j(l => {
											if (null !== l.body && !(l.body instanceof Blob)) throw new Error("Response is not a Blob.");
											return l.body
										}));
									case "text":
										return a.pipe(j(l => {
											if (null !== l.body && "string" != typeof l.body) throw new Error("Response is not a string.");
											return l.body
										}));
									default:
										return a.pipe(j(l => l.body))
								}
								case "response":
									return a;
								default:
									throw new Error(`Unreachable: unhandled observe type ${i.observe}}`)
						}
					}
					delete(e, r = {}) {
						return this.request("DELETE", e, r)
					}
					get(e, r = {}) {
						return this.request("GET", e, r)
					}
					head(e, r = {}) {
						return this.request("HEAD", e, r)
					}
					jsonp(e, r) {
						return this.request("JSONP", e, {
							params: (new Nr).append(r, "JSONP_CALLBACK"),
							observe: "body",
							responseType: "json"
						})
					}
					options(e, r = {}) {
						return this.request("OPTIONS", e, r)
					}
					patch(e, r, i = {}) {
						return this.request("PATCH", e, zh(i, r))
					}
					post(e, r, i = {}) {
						return this.request("POST", e, zh(i, r))
					}
					put(e, r, i = {}) {
						return this.request("PUT", e, zh(i, r))
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(PD))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();
			class GD {
				constructor(n, e) {
					this.next = n, this.interceptor = e
				}
				handle(n) {
					return this.interceptor.intercept(n, this.next)
				}
			}
			const Wh = new S("HTTP_INTERCEPTORS");
			let tV = (() => {
				class t {
					intercept(e, r) {
						return r.handle(e)
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();
			const nV = /^\)\]\}',?\n/;
			let zD = (() => {
				class t {
					constructor(e) {
						this.xhrFactory = e
					}
					handle(e) {
						if ("JSONP" === e.method) throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");
						return new Ce(r => {
							const i = this.xhrFactory.build();
							if (i.open(e.method, e.urlWithParams), e.withCredentials && (i.withCredentials = !0), e.headers.forEach((h, g) => i.setRequestHeader(h, g.join(","))), e.headers.has("Accept") || i.setRequestHeader("Accept", "application/json, text/plain, */*"), !e.headers.has("Content-Type")) {
								const h = e.detectContentTypeHeader();
								null !== h && i.setRequestHeader("Content-Type", h)
							}
							if (e.responseType) {
								const h = e.responseType.toLowerCase();
								i.responseType = "json" !== h ? h : "text"
							}
							const s = e.serializeBody();
							let o = null;
							const a = () => {
									if (null !== o) return o;
									const h = i.statusText || "OK",
										g = new cr(i.getAllResponseHeaders()),
										m = function rV(t) {
											return "responseURL" in t && t.responseURL ? t.responseURL : /^X-Request-URL:/m.test(t.getAllResponseHeaders()) ? t.getResponseHeader("X-Request-URL") : null
										}(i) || e.url;
									return o = new Gh({
										headers: g,
										status: i.status,
										statusText: h,
										url: m
									}), o
								},
								l = () => {
									let {
										headers: h,
										status: g,
										statusText: m,
										url: _
									} = a(), y = null;
									204 !== g && (y = typeof i.response > "u" ? i.responseText : i.response), 0 === g && (g = y ? 200 : 0);
									let C = g >= 200 && g < 300;
									if ("json" === e.responseType && "string" == typeof y) {
										const v = y;
										y = y.replace(nV, "");
										try {
											y = "" !== y ? JSON.parse(y) : null
										} catch (I) {
											y = v, C && (C = !1, y = {
												error: I,
												text: y
											})
										}
									}
									C ? (r.next(new iu({
										body: y,
										headers: h,
										status: g,
										statusText: m,
										url: _ || void 0
									})), r.complete()) : r.error(new UD({
										error: y,
										headers: h,
										status: g,
										statusText: m,
										url: _ || void 0
									}))
								},
								u = h => {
									const {
										url: g
									} = a(), m = new UD({
										error: h,
										status: i.status || 0,
										statusText: i.statusText || "Unknown Error",
										url: g || void 0
									});
									r.error(m)
								};
							let c = !1;
							const d = h => {
									c || (r.next(a()), c = !0);
									let g = {
										type: We.DownloadProgress,
										loaded: h.loaded
									};
									h.lengthComputable && (g.total = h.total), "text" === e.responseType && !!i.responseText && (g.partialText = i.responseText), r.next(g)
								},
								f = h => {
									let g = {
										type: We.UploadProgress,
										loaded: h.loaded
									};
									h.lengthComputable && (g.total = h.total), r.next(g)
								};
							return i.addEventListener("load", l), i.addEventListener("error", u), i.addEventListener("timeout", u), i.addEventListener("abort", u), e.reportProgress && (i.addEventListener("progress", d), null !== s && i.upload && i.upload.addEventListener("progress", f)), i.send(s), r.next({
								type: We.Sent
							}), () => {
								i.removeEventListener("error", u), i.removeEventListener("abort", u), i.removeEventListener("load", l), i.removeEventListener("timeout", u), e.reportProgress && (i.removeEventListener("progress", d), null !== s && i.upload && i.upload.removeEventListener("progress", f)), i.readyState !== i.DONE && i.abort()
							}
						})
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(tC))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();
			const qh = new S("XSRF_COOKIE_NAME"),
				Kh = new S("XSRF_HEADER_NAME");
			class WD {}
			let iV = (() => {
					class t {
						constructor(e, r, i) {
							this.doc = e, this.platform = r, this.cookieName = i, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0
						}
						getToken() {
							if ("server" === this.platform) return null;
							const e = this.doc.cookie || "";
							return e !== this.lastCookieString && (this.parseCount++, this.lastToken = Uw(e, this.cookieName), this.lastCookieString = e), this.lastToken
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(oe), b(an), b(qh))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac
					}), t
				})(),
				Qh = (() => {
					class t {
						constructor(e, r) {
							this.tokenService = e, this.headerName = r
						}
						intercept(e, r) {
							const i = e.url.toLowerCase();
							if ("GET" === e.method || "HEAD" === e.method || i.startsWith("http://") || i.startsWith("https://")) return r.handle(e);
							const s = this.tokenService.getToken();
							return null !== s && !e.headers.has(this.headerName) && (e = e.clone({
								headers: e.headers.set(this.headerName, s)
							})), r.handle(e)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(WD), b(Kh))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac
					}), t
				})(),
				sV = (() => {
					class t {
						constructor(e, r) {
							this.backend = e, this.injector = r, this.chain = null
						}
						handle(e) {
							if (null === this.chain) {
								const r = this.injector.get(Wh, []);
								this.chain = r.reduceRight((i, s) => new GD(i, s), this.backend)
							}
							return this.chain.handle(e)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(VD), b(It))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac
					}), t
				})(),
				oV = (() => {
					class t {
						static disable() {
							return {
								ngModule: t,
								providers: [{
									provide: Qh,
									useClass: tV
								}]
							}
						}
						static withOptions(e = {}) {
							return {
								ngModule: t,
								providers: [e.cookieName ? {
									provide: qh,
									useValue: e.cookieName
								} : [], e.headerName ? {
									provide: Kh,
									useValue: e.headerName
								} : []]
							}
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						providers: [Qh, {
							provide: Wh,
							useExisting: Qh,
							multi: !0
						}, {
							provide: WD,
							useClass: iV
						}, {
							provide: qh,
							useValue: "XSRF-TOKEN"
						}, {
							provide: Kh,
							useValue: "X-XSRF-TOKEN"
						}]
					}), t
				})(),
				aV = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						providers: [Ho, {
							provide: PD,
							useClass: sV
						}, zD, {
							provide: VD,
							useExisting: zD
						}],
						imports: [oV.withOptions({
							cookieName: "XSRF-TOKEN",
							headerName: "X-XSRF-TOKEN"
						})]
					}), t
				})();
			class qD {}
			const dr = "*";

			function uV(t, n) {
				return {
					type: 7,
					name: t,
					definitions: n,
					options: {}
				}
			}

			function cV(t, n = null) {
				return {
					type: 4,
					styles: n,
					timings: t
				}
			}

			function KD(t, n = null) {
				return {
					type: 2,
					steps: t,
					options: n
				}
			}

			function su(t) {
				return {
					type: 6,
					styles: t,
					offset: null
				}
			}

			function dV(t, n, e) {
				return {
					type: 0,
					name: t,
					styles: n,
					options: e
				}
			}

			function fV(t, n, e = null) {
				return {
					type: 1,
					expr: t,
					animation: n,
					options: e
				}
			}

			function QD(t) {
				Promise.resolve().then(t)
			}
			class jo {
				constructor(n = 0, e = 0) {
					this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._originalOnDoneFns = [], this._originalOnStartFns = [], this._started = !1, this._destroyed = !1, this._finished = !1, this._position = 0, this.parentPlayer = null, this.totalTime = n + e
				}
				_onFinish() {
					this._finished || (this._finished = !0, this._onDoneFns.forEach(n => n()), this._onDoneFns = [])
				}
				onStart(n) {
					this._originalOnStartFns.push(n), this._onStartFns.push(n)
				}
				onDone(n) {
					this._originalOnDoneFns.push(n), this._onDoneFns.push(n)
				}
				onDestroy(n) {
					this._onDestroyFns.push(n)
				}
				hasStarted() {
					return this._started
				}
				init() {}
				play() {
					this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0
				}
				triggerMicrotask() {
					QD(() => this._onFinish())
				}
				_onStart() {
					this._onStartFns.forEach(n => n()), this._onStartFns = []
				}
				pause() {}
				restart() {}
				finish() {
					this._onFinish()
				}
				destroy() {
					this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach(n => n()), this._onDestroyFns = [])
				}
				reset() {
					this._started = !1, this._finished = !1, this._onStartFns = this._originalOnStartFns, this._onDoneFns = this._originalOnDoneFns
				}
				setPosition(n) {
					this._position = this.totalTime ? n * this.totalTime : 1
				}
				getPosition() {
					return this.totalTime ? this._position / this.totalTime : 1
				}
				triggerCallback(n) {
					const e = "start" == n ? this._onStartFns : this._onDoneFns;
					e.forEach(r => r()), e.length = 0
				}
			}
			class YD {
				constructor(n) {
					this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, this.players = n;
					let e = 0,
						r = 0,
						i = 0;
					const s = this.players.length;
					0 == s ? QD(() => this._onFinish()) : this.players.forEach(o => {
						o.onDone(() => {
							++e == s && this._onFinish()
						}), o.onDestroy(() => {
							++r == s && this._onDestroy()
						}), o.onStart(() => {
							++i == s && this._onStart()
						})
					}), this.totalTime = this.players.reduce((o, a) => Math.max(o, a.totalTime), 0)
				}
				_onFinish() {
					this._finished || (this._finished = !0, this._onDoneFns.forEach(n => n()), this._onDoneFns = [])
				}
				init() {
					this.players.forEach(n => n.init())
				}
				onStart(n) {
					this._onStartFns.push(n)
				}
				_onStart() {
					this.hasStarted() || (this._started = !0, this._onStartFns.forEach(n => n()), this._onStartFns = [])
				}
				onDone(n) {
					this._onDoneFns.push(n)
				}
				onDestroy(n) {
					this._onDestroyFns.push(n)
				}
				hasStarted() {
					return this._started
				}
				play() {
					this.parentPlayer || this.init(), this._onStart(), this.players.forEach(n => n.play())
				}
				pause() {
					this.players.forEach(n => n.pause())
				}
				restart() {
					this.players.forEach(n => n.restart())
				}
				finish() {
					this._onFinish(), this.players.forEach(n => n.finish())
				}
				destroy() {
					this._onDestroy()
				}
				_onDestroy() {
					this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(n => n.destroy()), this._onDestroyFns.forEach(n => n()), this._onDestroyFns = [])
				}
				reset() {
					this.players.forEach(n => n.reset()), this._destroyed = !1, this._finished = !1, this._started = !1
				}
				setPosition(n) {
					const e = n * this.totalTime;
					this.players.forEach(r => {
						const i = r.totalTime ? Math.min(1, e / r.totalTime) : 1;
						r.setPosition(i)
					})
				}
				getPosition() {
					const n = this.players.reduce((e, r) => null === e || r.totalTime > e.totalTime ? r : e, null);
					return null != n ? n.getPosition() : 0
				}
				beforeDestroy() {
					this.players.forEach(n => {
						n.beforeDestroy && n.beforeDestroy()
					})
				}
				triggerCallback(n) {
					const e = "start" == n ? this._onStartFns : this._onDoneFns;
					e.forEach(r => r()), e.length = 0
				}
			}

			function ZD(t) {
				return new w(3e3, !1)
			}

			function qV() {
				return typeof window < "u" && typeof window.document < "u"
			}

			function Zh() {
				return typeof process < "u" && "[object process]" === {}.toString.call(process)
			}

			function Lr(t) {
				switch (t.length) {
					case 0:
						return new jo;
					case 1:
						return t[0];
					default:
						return new YD(t)
				}
			}

			function XD(t, n, e, r, i = new Map, s = new Map) {
				const o = [],
					a = [];
				let l = -1,
					u = null;
				if (r.forEach(c => {
						const d = c.get("offset"),
							f = d == l,
							h = f && u || new Map;
						c.forEach((g, m) => {
							let _ = m,
								y = g;
							if ("offset" !== m) switch (_ = n.normalizePropertyName(_, o), y) {
								case "!":
									y = i.get(m);
									break;
								case dr:
									y = s.get(m);
									break;
								default:
									y = n.normalizeStyleValue(m, _, y, o)
							}
							h.set(_, y)
						}), f || a.push(h), u = h, l = d
					}), o.length) throw function NV(t) {
					return new w(3502, !1)
				}();
				return a
			}

			function Xh(t, n, e, r) {
				switch (n) {
					case "start":
						t.onStart(() => r(e && Jh(e, "start", t)));
						break;
					case "done":
						t.onDone(() => r(e && Jh(e, "done", t)));
						break;
					case "destroy":
						t.onDestroy(() => r(e && Jh(e, "destroy", t)))
				}
			}

			function Jh(t, n, e) {
				const s = ep(t.element, t.triggerName, t.fromState, t.toState, n || t.phaseName, e.totalTime ?? t.totalTime, !!e.disabled),
					o = t._data;
				return null != o && (s._data = o), s
			}

			function ep(t, n, e, r, i = "", s = 0, o) {
				return {
					element: t,
					triggerName: n,
					fromState: e,
					toState: r,
					phaseName: i,
					totalTime: s,
					disabled: !!o
				}
			}

			function zt(t, n, e) {
				let r = t.get(n);
				return r || t.set(n, r = e), r
			}

			function JD(t) {
				const n = t.indexOf(":");
				return [t.substring(1, n), t.slice(n + 1)]
			}
			let tp = (t, n) => !1,
				ex = (t, n, e) => [],
				tx = null;

			function np(t) {
				const n = t.parentNode || t.host;
				return n === tx ? null : n
			}(Zh() || typeof Element < "u") && (qV() ? (tx = (() => document.documentElement)(), tp = (t, n) => {
				for (; n;) {
					if (n === t) return !0;
					n = np(n)
				}
				return !1
			}) : tp = (t, n) => t.contains(n), ex = (t, n, e) => {
				if (e) return Array.from(t.querySelectorAll(n));
				const r = t.querySelector(n);
				return r ? [r] : []
			});
			let fi = null,
				nx = !1;
			const rx = tp,
				ix = ex;
			let sx = (() => {
					class t {
						validateStyleProperty(e) {
							return function QV(t) {
								fi || (fi = function YV() {
									return typeof document < "u" ? document.body : null
								}() || {}, nx = !!fi.style && "WebkitAppearance" in fi.style);
								let n = !0;
								return fi.style && ! function KV(t) {
									return "ebkit" == t.substring(1, 6)
								}(t) && (n = t in fi.style, !n && nx && (n = "Webkit" + t.charAt(0).toUpperCase() + t.slice(1) in fi.style)), n
							}(e)
						}
						matchesElement(e, r) {
							return !1
						}
						containsElement(e, r) {
							return rx(e, r)
						}
						getParentElement(e) {
							return np(e)
						}
						query(e, r, i) {
							return ix(e, r, i)
						}
						computeStyle(e, r, i) {
							return i || ""
						}
						animate(e, r, i, s, o, a = [], l) {
							return new jo(i, s)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac
					}), t
				})(),
				rp = (() => {
					class t {}
					return t.NOOP = new sx, t
				})();
			const ip = "ng-enter",
				ou = "ng-leave",
				au = "ng-trigger",
				lu = ".ng-trigger",
				ax = "ng-animating",
				sp = ".ng-animating";

			function fr(t) {
				if ("number" == typeof t) return t;
				const n = t.match(/^(-?[\.\d]+)(m?s)/);
				return !n || n.length < 2 ? 0 : op(parseFloat(n[1]), n[2])
			}

			function op(t, n) {
				return "s" === n ? 1e3 * t : t
			}

			function uu(t, n, e) {
				return t.hasOwnProperty("duration") ? t : function JV(t, n, e) {
					let i, s = 0,
						o = "";
					if ("string" == typeof t) {
						const a = t.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
						if (null === a) return n.push(ZD()), {
							duration: 0,
							delay: 0,
							easing: ""
						};
						i = op(parseFloat(a[1]), a[2]);
						const l = a[3];
						null != l && (s = op(parseFloat(l), a[4]));
						const u = a[5];
						u && (o = u)
					} else i = t;
					if (!e) {
						let a = !1,
							l = n.length;
						i < 0 && (n.push(function hV() {
							return new w(3100, !1)
						}()), a = !0), s < 0 && (n.push(function pV() {
							return new w(3101, !1)
						}()), a = !0), a && n.splice(l, 0, ZD())
					}
					return {
						duration: i,
						delay: s,
						easing: o
					}
				}(t, n, e)
			}

			function $o(t, n = {}) {
				return Object.keys(t).forEach(e => {
					n[e] = t[e]
				}), n
			}

			function lx(t) {
				const n = new Map;
				return Object.keys(t).forEach(e => {
					n.set(e, t[e])
				}), n
			}

			function Pr(t, n = new Map, e) {
				if (e)
					for (let [r, i] of e) n.set(r, i);
				for (let [r, i] of t) n.set(r, i);
				return n
			}

			function cx(t, n, e) {
				return e ? n + ":" + e + ";" : ""
			}

			function dx(t) {
				let n = "";
				for (let e = 0; e < t.style.length; e++) {
					const r = t.style.item(e);
					n += cx(0, r, t.style.getPropertyValue(r))
				}
				for (const e in t.style) t.style.hasOwnProperty(e) && !e.startsWith("_") && (n += cx(0, rB(e), t.style[e]));
				t.setAttribute("style", n)
			}

			function Un(t, n, e) {
				t.style && (n.forEach((r, i) => {
					const s = lp(i);
					e && !e.has(i) && e.set(i, t.style[s]), t.style[s] = r
				}), Zh() && dx(t))
			}

			function hi(t, n) {
				t.style && (n.forEach((e, r) => {
					const i = lp(r);
					t.style[i] = ""
				}), Zh() && dx(t))
			}

			function Uo(t) {
				return Array.isArray(t) ? 1 == t.length ? t[0] : KD(t) : t
			}
			const ap = new RegExp("{{\\s*(.+?)\\s*}}", "g");

			function fx(t) {
				let n = [];
				if ("string" == typeof t) {
					let e;
					for (; e = ap.exec(t);) n.push(e[1]);
					ap.lastIndex = 0
				}
				return n
			}

			function Go(t, n, e) {
				const r = t.toString(),
					i = r.replace(ap, (s, o) => {
						let a = n[o];
						return null == a && (e.push(function mV(t) {
							return new w(3003, !1)
						}()), a = ""), a.toString()
					});
				return i == r ? t : i
			}

			function cu(t) {
				const n = [];
				let e = t.next();
				for (; !e.done;) n.push(e.value), e = t.next();
				return n
			}
			const nB = /-+([a-z0-9])/g;

			function lp(t) {
				return t.replace(nB, (...n) => n[1].toUpperCase())
			}

			function rB(t) {
				return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
			}

			function Wt(t, n, e) {
				switch (n.type) {
					case 7:
						return t.visitTrigger(n, e);
					case 0:
						return t.visitState(n, e);
					case 1:
						return t.visitTransition(n, e);
					case 2:
						return t.visitSequence(n, e);
					case 3:
						return t.visitGroup(n, e);
					case 4:
						return t.visitAnimate(n, e);
					case 5:
						return t.visitKeyframes(n, e);
					case 6:
						return t.visitStyle(n, e);
					case 8:
						return t.visitReference(n, e);
					case 9:
						return t.visitAnimateChild(n, e);
					case 10:
						return t.visitAnimateRef(n, e);
					case 11:
						return t.visitQuery(n, e);
					case 12:
						return t.visitStagger(n, e);
					default:
						throw function yV(t) {
							return new w(3004, !1)
						}()
				}
			}

			function hx(t, n) {
				return window.getComputedStyle(t)[n]
			}

			function uB(t, n) {
				const e = [];
				return "string" == typeof t ? t.split(/\s*,\s*/).forEach(r => function cB(t, n, e) {
					if (":" == t[0]) {
						const l = function dB(t, n) {
							switch (t) {
								case ":enter":
									return "void => *";
								case ":leave":
									return "* => void";
								case ":increment":
									return (e, r) => parseFloat(r) > parseFloat(e);
								case ":decrement":
									return (e, r) => parseFloat(r) < parseFloat(e);
								default:
									return n.push(function FV(t) {
										return new w(3016, !1)
									}()), "* => *"
							}
						}(t, e);
						if ("function" == typeof l) return void n.push(l);
						t = l
					}
					const r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
					if (null == r || r.length < 4) return e.push(function TV(t) {
						return new w(3015, !1)
					}()), n;
					const i = r[1],
						s = r[2],
						o = r[3];
					n.push(px(i, o));
					"<" == s[0] && !("*" == i && "*" == o) && n.push(px(o, i))
				}(r, e, n)) : e.push(t), e
			}
			const pu = new Set(["true", "1"]),
				gu = new Set(["false", "0"]);

			function px(t, n) {
				const e = pu.has(t) || gu.has(t),
					r = pu.has(n) || gu.has(n);
				return (i, s) => {
					let o = "*" == t || t == i,
						a = "*" == n || n == s;
					return !o && e && "boolean" == typeof i && (o = i ? pu.has(t) : gu.has(t)), !a && r && "boolean" == typeof s && (a = s ? pu.has(n) : gu.has(n)), o && a
				}
			}
			const fB = new RegExp("s*:selfs*,?", "g");

			function up(t, n, e, r) {
				return new hB(t).build(n, e, r)
			}
			class hB {
				constructor(n) {
					this._driver = n
				}
				build(n, e, r) {
					const i = new mB(e);
					return this._resetContextStyleTimingState(i), Wt(this, Uo(n), i)
				}
				_resetContextStyleTimingState(n) {
					n.currentQuerySelector = "", n.collectedStyles = new Map, n.collectedStyles.set("", new Map), n.currentTime = 0
				}
				visitTrigger(n, e) {
					let r = e.queryCount = 0,
						i = e.depCount = 0;
					const s = [],
						o = [];
					return "@" == n.name.charAt(0) && e.errors.push(function vV() {
						return new w(3006, !1)
					}()), n.definitions.forEach(a => {
						if (this._resetContextStyleTimingState(e), 0 == a.type) {
							const l = a,
								u = l.name;
							u.toString().split(/\s*,\s*/).forEach(c => {
								l.name = c, s.push(this.visitState(l, e))
							}), l.name = u
						} else if (1 == a.type) {
							const l = this.visitTransition(a, e);
							r += l.queryCount, i += l.depCount, o.push(l)
						} else e.errors.push(function bV() {
							return new w(3007, !1)
						}())
					}), {
						type: 7,
						name: n.name,
						states: s,
						transitions: o,
						queryCount: r,
						depCount: i,
						options: null
					}
				}
				visitState(n, e) {
					const r = this.visitStyle(n.styles, e),
						i = n.options && n.options.params || null;
					if (r.containsDynamicStyles) {
						const s = new Set,
							o = i || {};
						r.styles.forEach(a => {
							a instanceof Map && a.forEach(l => {
								fx(l).forEach(u => {
									o.hasOwnProperty(u) || s.add(u)
								})
							})
						}), s.size && (cu(s.values()), e.errors.push(function wV(t, n) {
							return new w(3008, !1)
						}()))
					}
					return {
						type: 0,
						name: n.name,
						style: r,
						options: i ? {
							params: i
						} : null
					}
				}
				visitTransition(n, e) {
					e.queryCount = 0, e.depCount = 0;
					const r = Wt(this, Uo(n.animation), e);
					return {
						type: 1,
						matchers: uB(n.expr, e.errors),
						animation: r,
						queryCount: e.queryCount,
						depCount: e.depCount,
						options: pi(n.options)
					}
				}
				visitSequence(n, e) {
					return {
						type: 2,
						steps: n.steps.map(r => Wt(this, r, e)),
						options: pi(n.options)
					}
				}
				visitGroup(n, e) {
					const r = e.currentTime;
					let i = 0;
					const s = n.steps.map(o => {
						e.currentTime = r;
						const a = Wt(this, o, e);
						return i = Math.max(i, e.currentTime), a
					});
					return e.currentTime = i, {
						type: 3,
						steps: s,
						options: pi(n.options)
					}
				}
				visitAnimate(n, e) {
					const r = function _B(t, n) {
						if (t.hasOwnProperty("duration")) return t;
						if ("number" == typeof t) return cp(uu(t, n).duration, 0, "");
						const e = t;
						if (e.split(/\s+/).some(s => "{" == s.charAt(0) && "{" == s.charAt(1))) {
							const s = cp(0, 0, "");
							return s.dynamic = !0, s.strValue = e, s
						}
						const i = uu(e, n);
						return cp(i.duration, i.delay, i.easing)
					}(n.timings, e.errors);
					e.currentAnimateTimings = r;
					let i, s = n.styles ? n.styles : su({});
					if (5 == s.type) i = this.visitKeyframes(s, e);
					else {
						let o = n.styles,
							a = !1;
						if (!o) {
							a = !0;
							const u = {};
							r.easing && (u.easing = r.easing), o = su(u)
						}
						e.currentTime += r.duration + r.delay;
						const l = this.visitStyle(o, e);
						l.isEmptyStep = a, i = l
					}
					return e.currentAnimateTimings = null, {
						type: 4,
						timings: r,
						style: i,
						options: null
					}
				}
				visitStyle(n, e) {
					const r = this._makeStyleAst(n, e);
					return this._validateStyleAst(r, e), r
				}
				_makeStyleAst(n, e) {
					const r = [],
						i = Array.isArray(n.styles) ? n.styles : [n.styles];
					for (let a of i) "string" == typeof a ? a === dr ? r.push(a) : e.errors.push(new w(3002, !1)) : r.push(lx(a));
					let s = !1,
						o = null;
					return r.forEach(a => {
						if (a instanceof Map && (a.has("easing") && (o = a.get("easing"), a.delete("easing")), !s))
							for (let l of a.values())
								if (l.toString().indexOf("{{") >= 0) {
									s = !0;
									break
								}
					}), {
						type: 6,
						styles: r,
						easing: o,
						offset: n.offset,
						containsDynamicStyles: s,
						options: null
					}
				}
				_validateStyleAst(n, e) {
					const r = e.currentAnimateTimings;
					let i = e.currentTime,
						s = e.currentTime;
					r && s > 0 && (s -= r.duration + r.delay), n.styles.forEach(o => {
						"string" != typeof o && o.forEach((a, l) => {
							const u = e.collectedStyles.get(e.currentQuerySelector),
								c = u.get(l);
							let d = !0;
							c && (s != i && s >= c.startTime && i <= c.endTime && (e.errors.push(function DV(t, n, e, r, i) {
								return new w(3010, !1)
							}()), d = !1), s = c.startTime), d && u.set(l, {
								startTime: s,
								endTime: i
							}), e.options && function tB(t, n, e) {
								const r = n.params || {},
									i = fx(t);
								i.length && i.forEach(s => {
									r.hasOwnProperty(s) || e.push(function gV(t) {
										return new w(3001, !1)
									}())
								})
							}(a, e.options, e.errors)
						})
					})
				}
				visitKeyframes(n, e) {
					const r = {
						type: 5,
						styles: [],
						options: null
					};
					if (!e.currentAnimateTimings) return e.errors.push(function xV() {
						return new w(3011, !1)
					}()), r;
					let s = 0;
					const o = [];
					let a = !1,
						l = !1,
						u = 0;
					const c = n.steps.map(y => {
						const C = this._makeStyleAst(y, e);
						let v = null != C.offset ? C.offset : function yB(t) {
								if ("string" == typeof t) return null;
								let n = null;
								if (Array.isArray(t)) t.forEach(e => {
									if (e instanceof Map && e.has("offset")) {
										const r = e;
										n = parseFloat(r.get("offset")), r.delete("offset")
									}
								});
								else if (t instanceof Map && t.has("offset")) {
									const e = t;
									n = parseFloat(e.get("offset")), e.delete("offset")
								}
								return n
							}(C.styles),
							I = 0;
						return null != v && (s++, I = C.offset = v), l = l || I < 0 || I > 1, a = a || I < u, u = I, o.push(I), C
					});
					l && e.errors.push(function EV() {
						return new w(3012, !1)
					}()), a && e.errors.push(function MV() {
						return new w(3200, !1)
					}());
					const d = n.steps.length;
					let f = 0;
					s > 0 && s < d ? e.errors.push(function AV() {
						return new w(3202, !1)
					}()) : 0 == s && (f = 1 / (d - 1));
					const h = d - 1,
						g = e.currentTime,
						m = e.currentAnimateTimings,
						_ = m.duration;
					return c.forEach((y, C) => {
						const v = f > 0 ? C == h ? 1 : f * C : o[C],
							I = v * _;
						e.currentTime = g + m.delay + I, m.duration = I, this._validateStyleAst(y, e), y.offset = v, r.styles.push(y)
					}), r
				}
				visitReference(n, e) {
					return {
						type: 8,
						animation: Wt(this, Uo(n.animation), e),
						options: pi(n.options)
					}
				}
				visitAnimateChild(n, e) {
					return e.depCount++, {
						type: 9,
						options: pi(n.options)
					}
				}
				visitAnimateRef(n, e) {
					return {
						type: 10,
						animation: this.visitReference(n.animation, e),
						options: pi(n.options)
					}
				}
				visitQuery(n, e) {
					const r = e.currentQuerySelector,
						i = n.options || {};
					e.queryCount++, e.currentQuery = n;
					const [s, o] = function pB(t) {
						const n = !!t.split(/\s*,\s*/).find(e => ":self" == e);
						return n && (t = t.replace(fB, "")), t = t.replace(/@\*/g, lu).replace(/@\w+/g, e => lu + "-" + e.slice(1)).replace(/:animating/g, sp), [t, n]
					}(n.selector);
					e.currentQuerySelector = r.length ? r + " " + s : s, zt(e.collectedStyles, e.currentQuerySelector, new Map);
					const a = Wt(this, Uo(n.animation), e);
					return e.currentQuery = null, e.currentQuerySelector = r, {
						type: 11,
						selector: s,
						limit: i.limit || 0,
						optional: !!i.optional,
						includeSelf: o,
						animation: a,
						originalSelector: n.selector,
						options: pi(n.options)
					}
				}
				visitStagger(n, e) {
					e.currentQuery || e.errors.push(function SV() {
						return new w(3013, !1)
					}());
					const r = "full" === n.timings ? {
						duration: 0,
						delay: 0,
						easing: "full"
					} : uu(n.timings, e.errors, !0);
					return {
						type: 12,
						animation: Wt(this, Uo(n.animation), e),
						timings: r,
						options: null
					}
				}
			}
			class mB {
				constructor(n) {
					this.errors = n, this.queryCount = 0, this.depCount = 0, this.currentTransition = null, this.currentQuery = null, this.currentQuerySelector = null, this.currentAnimateTimings = null, this.currentTime = 0, this.collectedStyles = new Map, this.options = null, this.unsupportedCSSPropertiesFound = new Set
				}
			}

			function pi(t) {
				return t ? (t = $o(t)).params && (t.params = function gB(t) {
					return t ? $o(t) : null
				}(t.params)) : t = {}, t
			}

			function cp(t, n, e) {
				return {
					duration: t,
					delay: n,
					easing: e
				}
			}

			function dp(t, n, e, r, i, s, o = null, a = !1) {
				return {
					type: 1,
					element: t,
					keyframes: n,
					preStyleProps: e,
					postStyleProps: r,
					duration: i,
					delay: s,
					totalTime: i + s,
					easing: o,
					subTimeline: a
				}
			}
			class mu {
				constructor() {
					this._map = new Map
				}
				get(n) {
					return this._map.get(n) || []
				}
				append(n, e) {
					let r = this._map.get(n);
					r || this._map.set(n, r = []), r.push(...e)
				}
				has(n) {
					return this._map.has(n)
				}
				clear() {
					this._map.clear()
				}
			}
			const wB = new RegExp(":enter", "g"),
				DB = new RegExp(":leave", "g");

			function fp(t, n, e, r, i, s = new Map, o = new Map, a, l, u = []) {
				return (new xB).buildKeyframes(t, n, e, r, i, s, o, a, l, u)
			}
			class xB {
				buildKeyframes(n, e, r, i, s, o, a, l, u, c = []) {
					u = u || new mu;
					const d = new hp(n, e, u, i, s, c, []);
					d.options = l;
					const f = l.delay ? fr(l.delay) : 0;
					d.currentTimeline.delayNextStep(f), d.currentTimeline.setStyles([o], null, d.errors, l), Wt(this, r, d);
					const h = d.timelines.filter(g => g.containsAnimation());
					if (h.length && a.size) {
						let g;
						for (let m = h.length - 1; m >= 0; m--) {
							const _ = h[m];
							if (_.element === e) {
								g = _;
								break
							}
						}
						g && !g.allowOnlyTimelineStyles() && g.setStyles([a], null, d.errors, l)
					}
					return h.length ? h.map(g => g.buildKeyframes()) : [dp(e, [], [], [], 0, f, "", !1)]
				}
				visitTrigger(n, e) {}
				visitState(n, e) {}
				visitTransition(n, e) {}
				visitAnimateChild(n, e) {
					const r = e.subInstructions.get(e.element);
					if (r) {
						const i = e.createSubContext(n.options),
							s = e.currentTimeline.currentTime,
							o = this._visitSubInstructions(r, i, i.options);
						s != o && e.transformIntoNewTimeline(o)
					}
					e.previousNode = n
				}
				visitAnimateRef(n, e) {
					const r = e.createSubContext(n.options);
					r.transformIntoNewTimeline(), this._applyAnimationRefDelays([n.options, n.animation.options], e, r), this.visitReference(n.animation, r), e.transformIntoNewTimeline(r.currentTimeline.currentTime), e.previousNode = n
				}
				_applyAnimationRefDelays(n, e, r) {
					for (const i of n) {
						const s = i?.delay;
						if (s) {
							const o = "number" == typeof s ? s : fr(Go(s, i?.params ?? {}, e.errors));
							r.delayNextStep(o)
						}
					}
				}
				_visitSubInstructions(n, e, r) {
					let s = e.currentTimeline.currentTime;
					const o = null != r.duration ? fr(r.duration) : null,
						a = null != r.delay ? fr(r.delay) : null;
					return 0 !== o && n.forEach(l => {
						const u = e.appendInstructionToTimeline(l, o, a);
						s = Math.max(s, u.duration + u.delay)
					}), s
				}
				visitReference(n, e) {
					e.updateOptions(n.options, !0), Wt(this, n.animation, e), e.previousNode = n
				}
				visitSequence(n, e) {
					const r = e.subContextCount;
					let i = e;
					const s = n.options;
					if (s && (s.params || s.delay) && (i = e.createSubContext(s), i.transformIntoNewTimeline(), null != s.delay)) {
						6 == i.previousNode.type && (i.currentTimeline.snapshotCurrentStyles(), i.previousNode = yu);
						const o = fr(s.delay);
						i.delayNextStep(o)
					}
					n.steps.length && (n.steps.forEach(o => Wt(this, o, i)), i.currentTimeline.applyStylesToKeyframe(), i.subContextCount > r && i.transformIntoNewTimeline()), e.previousNode = n
				}
				visitGroup(n, e) {
					const r = [];
					let i = e.currentTimeline.currentTime;
					const s = n.options && n.options.delay ? fr(n.options.delay) : 0;
					n.steps.forEach(o => {
						const a = e.createSubContext(n.options);
						s && a.delayNextStep(s), Wt(this, o, a), i = Math.max(i, a.currentTimeline.currentTime), r.push(a.currentTimeline)
					}), r.forEach(o => e.currentTimeline.mergeTimelineCollectedStyles(o)), e.transformIntoNewTimeline(i), e.previousNode = n
				}
				_visitTiming(n, e) {
					if (n.dynamic) {
						const r = n.strValue;
						return uu(e.params ? Go(r, e.params, e.errors) : r, e.errors)
					}
					return {
						duration: n.duration,
						delay: n.delay,
						easing: n.easing
					}
				}
				visitAnimate(n, e) {
					const r = e.currentAnimateTimings = this._visitTiming(n.timings, e),
						i = e.currentTimeline;
					r.delay && (e.incrementTime(r.delay), i.snapshotCurrentStyles());
					const s = n.style;
					5 == s.type ? this.visitKeyframes(s, e) : (e.incrementTime(r.duration), this.visitStyle(s, e), i.applyStylesToKeyframe()), e.currentAnimateTimings = null, e.previousNode = n
				}
				visitStyle(n, e) {
					const r = e.currentTimeline,
						i = e.currentAnimateTimings;
					!i && r.hasCurrentStyleProperties() && r.forwardFrame();
					const s = i && i.easing || n.easing;
					n.isEmptyStep ? r.applyEmptyStep(s) : r.setStyles(n.styles, s, e.errors, e.options), e.previousNode = n
				}
				visitKeyframes(n, e) {
					const r = e.currentAnimateTimings,
						i = e.currentTimeline.duration,
						s = r.duration,
						a = e.createSubContext().currentTimeline;
					a.easing = r.easing, n.styles.forEach(l => {
						a.forwardTime((l.offset || 0) * s), a.setStyles(l.styles, l.easing, e.errors, e.options), a.applyStylesToKeyframe()
					}), e.currentTimeline.mergeTimelineCollectedStyles(a), e.transformIntoNewTimeline(i + s), e.previousNode = n
				}
				visitQuery(n, e) {
					const r = e.currentTimeline.currentTime,
						i = n.options || {},
						s = i.delay ? fr(i.delay) : 0;
					s && (6 === e.previousNode.type || 0 == r && e.currentTimeline.hasCurrentStyleProperties()) && (e.currentTimeline.snapshotCurrentStyles(), e.previousNode = yu);
					let o = r;
					const a = e.invokeQuery(n.selector, n.originalSelector, n.limit, n.includeSelf, !!i.optional, e.errors);
					e.currentQueryTotal = a.length;
					let l = null;
					a.forEach((u, c) => {
						e.currentQueryIndex = c;
						const d = e.createSubContext(n.options, u);
						s && d.delayNextStep(s), u === e.element && (l = d.currentTimeline), Wt(this, n.animation, d), d.currentTimeline.applyStylesToKeyframe(), o = Math.max(o, d.currentTimeline.currentTime)
					}), e.currentQueryIndex = 0, e.currentQueryTotal = 0, e.transformIntoNewTimeline(o), l && (e.currentTimeline.mergeTimelineCollectedStyles(l), e.currentTimeline.snapshotCurrentStyles()), e.previousNode = n
				}
				visitStagger(n, e) {
					const r = e.parentContext,
						i = e.currentTimeline,
						s = n.timings,
						o = Math.abs(s.duration),
						a = o * (e.currentQueryTotal - 1);
					let l = o * e.currentQueryIndex;
					switch (s.duration < 0 ? "reverse" : s.easing) {
						case "reverse":
							l = a - l;
							break;
						case "full":
							l = r.currentStaggerTime
					}
					const c = e.currentTimeline;
					l && c.delayNextStep(l);
					const d = c.currentTime;
					Wt(this, n.animation, e), e.previousNode = n, r.currentStaggerTime = i.currentTime - d + (i.startTime - r.currentTimeline.startTime)
				}
			}
			const yu = {};
			class hp {
				constructor(n, e, r, i, s, o, a, l) {
					this._driver = n, this.element = e, this.subInstructions = r, this._enterClassName = i, this._leaveClassName = s, this.errors = o, this.timelines = a, this.parentContext = null, this.currentAnimateTimings = null, this.previousNode = yu, this.subContextCount = 0, this.options = {}, this.currentQueryIndex = 0, this.currentQueryTotal = 0, this.currentStaggerTime = 0, this.currentTimeline = l || new _u(this._driver, e, 0), a.push(this.currentTimeline)
				}
				get params() {
					return this.options.params
				}
				updateOptions(n, e) {
					if (!n) return;
					const r = n;
					let i = this.options;
					null != r.duration && (i.duration = fr(r.duration)), null != r.delay && (i.delay = fr(r.delay));
					const s = r.params;
					if (s) {
						let o = i.params;
						o || (o = this.options.params = {}), Object.keys(s).forEach(a => {
							(!e || !o.hasOwnProperty(a)) && (o[a] = Go(s[a], o, this.errors))
						})
					}
				}
				_copyOptions() {
					const n = {};
					if (this.options) {
						const e = this.options.params;
						if (e) {
							const r = n.params = {};
							Object.keys(e).forEach(i => {
								r[i] = e[i]
							})
						}
					}
					return n
				}
				createSubContext(n = null, e, r) {
					const i = e || this.element,
						s = new hp(this._driver, i, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(i, r || 0));
					return s.previousNode = this.previousNode, s.currentAnimateTimings = this.currentAnimateTimings, s.options = this._copyOptions(), s.updateOptions(n), s.currentQueryIndex = this.currentQueryIndex, s.currentQueryTotal = this.currentQueryTotal, s.parentContext = this, this.subContextCount++, s
				}
				transformIntoNewTimeline(n) {
					return this.previousNode = yu, this.currentTimeline = this.currentTimeline.fork(this.element, n), this.timelines.push(this.currentTimeline), this.currentTimeline
				}
				appendInstructionToTimeline(n, e, r) {
					const i = {
							duration: e ?? n.duration,
							delay: this.currentTimeline.currentTime + (r ?? 0) + n.delay,
							easing: ""
						},
						s = new EB(this._driver, n.element, n.keyframes, n.preStyleProps, n.postStyleProps, i, n.stretchStartingKeyframe);
					return this.timelines.push(s), i
				}
				incrementTime(n) {
					this.currentTimeline.forwardTime(this.currentTimeline.duration + n)
				}
				delayNextStep(n) {
					n > 0 && this.currentTimeline.delayNextStep(n)
				}
				invokeQuery(n, e, r, i, s, o) {
					let a = [];
					if (i && a.push(this.element), n.length > 0) {
						n = (n = n.replace(wB, "." + this._enterClassName)).replace(DB, "." + this._leaveClassName);
						let u = this._driver.query(this.element, n, 1 != r);
						0 !== r && (u = r < 0 ? u.slice(u.length + r, u.length) : u.slice(0, r)), a.push(...u)
					}
					return !s && 0 == a.length && o.push(function IV(t) {
						return new w(3014, !1)
					}()), a
				}
			}
			class _u {
				constructor(n, e, r, i) {
					this._driver = n, this.element = e, this.startTime = r, this._elementTimelineStylesLookup = i, this.duration = 0, this._previousKeyframe = new Map, this._currentKeyframe = new Map, this._keyframes = new Map, this._styleSummary = new Map, this._localTimelineStyles = new Map, this._pendingStyles = new Map, this._backFill = new Map, this._currentEmptyStepKeyframe = null, this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map), this._globalTimelineStyles = this._elementTimelineStylesLookup.get(e), this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles, this._elementTimelineStylesLookup.set(e, this._localTimelineStyles)), this._loadKeyframe()
				}
				containsAnimation() {
					switch (this._keyframes.size) {
						case 0:
							return !1;
						case 1:
							return this.hasCurrentStyleProperties();
						default:
							return !0
					}
				}
				hasCurrentStyleProperties() {
					return this._currentKeyframe.size > 0
				}
				get currentTime() {
					return this.startTime + this.duration
				}
				delayNextStep(n) {
					const e = 1 === this._keyframes.size && this._pendingStyles.size;
					this.duration || e ? (this.forwardTime(this.currentTime + n), e && this.snapshotCurrentStyles()) : this.startTime += n
				}
				fork(n, e) {
					return this.applyStylesToKeyframe(), new _u(this._driver, n, e || this.currentTime, this._elementTimelineStylesLookup)
				}
				_loadKeyframe() {
					this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe), this._currentKeyframe = this._keyframes.get(this.duration), this._currentKeyframe || (this._currentKeyframe = new Map, this._keyframes.set(this.duration, this._currentKeyframe))
				}
				forwardFrame() {
					this.duration += 1, this._loadKeyframe()
				}
				forwardTime(n) {
					this.applyStylesToKeyframe(), this.duration = n, this._loadKeyframe()
				}
				_updateStyle(n, e) {
					this._localTimelineStyles.set(n, e), this._globalTimelineStyles.set(n, e), this._styleSummary.set(n, {
						time: this.currentTime,
						value: e
					})
				}
				allowOnlyTimelineStyles() {
					return this._currentEmptyStepKeyframe !== this._currentKeyframe
				}
				applyEmptyStep(n) {
					n && this._previousKeyframe.set("easing", n);
					for (let [e, r] of this._globalTimelineStyles) this._backFill.set(e, r || dr), this._currentKeyframe.set(e, dr);
					this._currentEmptyStepKeyframe = this._currentKeyframe
				}
				setStyles(n, e, r, i) {
					e && this._previousKeyframe.set("easing", e);
					const s = i && i.params || {},
						o = function MB(t, n) {
							const e = new Map;
							let r;
							return t.forEach(i => {
								if ("*" === i) {
									r = r || n.keys();
									for (let s of r) e.set(s, dr)
								} else Pr(i, e)
							}), e
						}(n, this._globalTimelineStyles);
					for (let [a, l] of o) {
						const u = Go(l, s, r);
						this._pendingStyles.set(a, u), this._localTimelineStyles.has(a) || this._backFill.set(a, this._globalTimelineStyles.get(a) ?? dr), this._updateStyle(a, u)
					}
				}
				applyStylesToKeyframe() {
					0 != this._pendingStyles.size && (this._pendingStyles.forEach((n, e) => {
						this._currentKeyframe.set(e, n)
					}), this._pendingStyles.clear(), this._localTimelineStyles.forEach((n, e) => {
						this._currentKeyframe.has(e) || this._currentKeyframe.set(e, n)
					}))
				}
				snapshotCurrentStyles() {
					for (let [n, e] of this._localTimelineStyles) this._pendingStyles.set(n, e), this._updateStyle(n, e)
				}
				getFinalKeyframe() {
					return this._keyframes.get(this.duration)
				}
				get properties() {
					const n = [];
					for (let e in this._currentKeyframe) n.push(e);
					return n
				}
				mergeTimelineCollectedStyles(n) {
					n._styleSummary.forEach((e, r) => {
						const i = this._styleSummary.get(r);
						(!i || e.time > i.time) && this._updateStyle(r, e.value)
					})
				}
				buildKeyframes() {
					this.applyStylesToKeyframe();
					const n = new Set,
						e = new Set,
						r = 1 === this._keyframes.size && 0 === this.duration;
					let i = [];
					this._keyframes.forEach((a, l) => {
						const u = Pr(a, new Map, this._backFill);
						u.forEach((c, d) => {
							"!" === c ? n.add(d) : c === dr && e.add(d)
						}), r || u.set("offset", l / this.duration), i.push(u)
					});
					const s = n.size ? cu(n.values()) : [],
						o = e.size ? cu(e.values()) : [];
					if (r) {
						const a = i[0],
							l = new Map(a);
						a.set("offset", 0), l.set("offset", 1), i = [a, l]
					}
					return dp(this.element, i, s, o, this.duration, this.startTime, this.easing, !1)
				}
			}
			class EB extends _u {
				constructor(n, e, r, i, s, o, a = !1) {
					super(n, e, o.delay), this.keyframes = r, this.preStyleProps = i, this.postStyleProps = s, this._stretchStartingKeyframe = a, this.timings = {
						duration: o.duration,
						delay: o.delay,
						easing: o.easing
					}
				}
				containsAnimation() {
					return this.keyframes.length > 1
				}
				buildKeyframes() {
					let n = this.keyframes,
						{
							delay: e,
							duration: r,
							easing: i
						} = this.timings;
					if (this._stretchStartingKeyframe && e) {
						const s = [],
							o = r + e,
							a = e / o,
							l = Pr(n[0]);
						l.set("offset", 0), s.push(l);
						const u = Pr(n[0]);
						u.set("offset", yx(a)), s.push(u);
						const c = n.length - 1;
						for (let d = 1; d <= c; d++) {
							let f = Pr(n[d]);
							const h = f.get("offset");
							f.set("offset", yx((e + h * r) / o)), s.push(f)
						}
						r = o, e = 0, i = "", n = s
					}
					return dp(this.element, n, this.preStyleProps, this.postStyleProps, r, e, i, !0)
				}
			}

			function yx(t, n = 3) {
				const e = Math.pow(10, n - 1);
				return Math.round(t * e) / e
			}
			class pp {}
			const AB = new Set(["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "left", "top", "bottom", "right", "fontSize", "outlineWidth", "outlineOffset", "paddingTop", "paddingLeft", "paddingBottom", "paddingRight", "marginTop", "marginLeft", "marginBottom", "marginRight", "borderRadius", "borderWidth", "borderTopWidth", "borderLeftWidth", "borderRightWidth", "borderBottomWidth", "textIndent", "perspective"]);
			class SB extends pp {
				normalizePropertyName(n, e) {
					return lp(n)
				}
				normalizeStyleValue(n, e, r, i) {
					let s = "";
					const o = r.toString().trim();
					if (AB.has(e) && 0 !== r && "0" !== r)
						if ("number" == typeof r) s = "px";
						else {
							const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
							a && 0 == a[1].length && i.push(function _V(t, n) {
								return new w(3005, !1)
							}())
						} return o + s
				}
			}

			function _x(t, n, e, r, i, s, o, a, l, u, c, d, f) {
				return {
					type: 0,
					element: t,
					triggerName: n,
					isRemovalTransition: i,
					fromState: e,
					fromStyles: s,
					toState: r,
					toStyles: o,
					timelines: a,
					queriedElements: l,
					preStyleProps: u,
					postStyleProps: c,
					totalTime: d,
					errors: f
				}
			}
			const gp = {};
			class vx {
				constructor(n, e, r) {
					this._triggerName = n, this.ast = e, this._stateStyles = r
				}
				match(n, e, r, i) {
					return function IB(t, n, e, r, i) {
						return t.some(s => s(n, e, r, i))
					}(this.ast.matchers, n, e, r, i)
				}
				buildStyles(n, e, r) {
					let i = this._stateStyles.get("*");
					return void 0 !== n && (i = this._stateStyles.get(n?.toString()) || i), i ? i.buildStyles(e, r) : new Map
				}
				build(n, e, r, i, s, o, a, l, u, c) {
					const d = [],
						f = this.ast.options && this.ast.options.params || gp,
						g = this.buildStyles(r, a && a.params || gp, d),
						m = l && l.params || gp,
						_ = this.buildStyles(i, m, d),
						y = new Set,
						C = new Map,
						v = new Map,
						I = "void" === i,
						K = {
							params: TB(m, f),
							delay: this.ast.options?.delay
						},
						ee = c ? [] : fp(n, e, this.ast.animation, s, o, g, _, K, u, d);
					let Te = 0;
					if (ee.forEach(Yt => {
							Te = Math.max(Yt.duration + Yt.delay, Te)
						}), d.length) return _x(e, this._triggerName, r, i, I, g, _, [], [], C, v, Te, d);
					ee.forEach(Yt => {
						const Zt = Yt.element,
							Fs = zt(C, Zt, new Set);
						Yt.preStyleProps.forEach(Tn => Fs.add(Tn));
						const vr = zt(v, Zt, new Set);
						Yt.postStyleProps.forEach(Tn => vr.add(Tn)), Zt !== e && y.add(Zt)
					});
					const Qt = cu(y.values());
					return _x(e, this._triggerName, r, i, I, g, _, ee, Qt, C, v, Te)
				}
			}

			function TB(t, n) {
				const e = $o(n);
				for (const r in t) t.hasOwnProperty(r) && null != t[r] && (e[r] = t[r]);
				return e
			}
			class FB {
				constructor(n, e, r) {
					this.styles = n, this.defaultParams = e, this.normalizer = r
				}
				buildStyles(n, e) {
					const r = new Map,
						i = $o(this.defaultParams);
					return Object.keys(n).forEach(s => {
						const o = n[s];
						null !== o && (i[s] = o)
					}), this.styles.styles.forEach(s => {
						"string" != typeof s && s.forEach((o, a) => {
							o && (o = Go(o, i, e));
							const l = this.normalizer.normalizePropertyName(a, e);
							o = this.normalizer.normalizeStyleValue(a, l, o, e), r.set(l, o)
						})
					}), r
				}
			}
			class OB {
				constructor(n, e, r) {
					this.name = n, this.ast = e, this._normalizer = r, this.transitionFactories = [], this.states = new Map, e.states.forEach(i => {
						this.states.set(i.name, new FB(i.style, i.options && i.options.params || {}, r))
					}), bx(this.states, "true", "1"), bx(this.states, "false", "0"), e.transitions.forEach(i => {
						this.transitionFactories.push(new vx(n, i, this.states))
					}), this.fallbackTransition = function kB(t, n, e) {
						return new vx(t, {
							type: 1,
							animation: {
								type: 2,
								steps: [],
								options: null
							},
							matchers: [(o, a) => !0],
							options: null,
							queryCount: 0,
							depCount: 0
						}, n)
					}(n, this.states)
				}
				get containsQueries() {
					return this.ast.queryCount > 0
				}
				matchTransition(n, e, r, i) {
					return this.transitionFactories.find(o => o.match(n, e, r, i)) || null
				}
				matchStyles(n, e, r) {
					return this.fallbackTransition.buildStyles(n, e, r)
				}
			}

			function bx(t, n, e) {
				t.has(n) ? t.has(e) || t.set(e, t.get(n)) : t.has(e) && t.set(n, t.get(e))
			}
			const NB = new mu;
			class LB {
				constructor(n, e, r) {
					this.bodyNode = n, this._driver = e, this._normalizer = r, this._animations = new Map, this._playersById = new Map, this.players = []
				}
				register(n, e) {
					const r = [],
						s = up(this._driver, e, r, []);
					if (r.length) throw function LV(t) {
						return new w(3503, !1)
					}();
					this._animations.set(n, s)
				}
				_buildPlayer(n, e, r) {
					const i = n.element,
						s = XD(0, this._normalizer, 0, n.keyframes, e, r);
					return this._driver.animate(i, s, n.duration, n.delay, n.easing, [], !0)
				}
				create(n, e, r = {}) {
					const i = [],
						s = this._animations.get(n);
					let o;
					const a = new Map;
					if (s ? (o = fp(this._driver, e, s, ip, ou, new Map, new Map, r, NB, i), o.forEach(c => {
							const d = zt(a, c.element, new Map);
							c.postStyleProps.forEach(f => d.set(f, null))
						})) : (i.push(function PV() {
							return new w(3300, !1)
						}()), o = []), i.length) throw function VV(t) {
						return new w(3504, !1)
					}();
					a.forEach((c, d) => {
						c.forEach((f, h) => {
							c.set(h, this._driver.computeStyle(d, h, dr))
						})
					});
					const u = Lr(o.map(c => {
						const d = a.get(c.element);
						return this._buildPlayer(c, new Map, d)
					}));
					return this._playersById.set(n, u), u.onDestroy(() => this.destroy(n)), this.players.push(u), u
				}
				destroy(n) {
					const e = this._getPlayer(n);
					e.destroy(), this._playersById.delete(n);
					const r = this.players.indexOf(e);
					r >= 0 && this.players.splice(r, 1)
				}
				_getPlayer(n) {
					const e = this._playersById.get(n);
					if (!e) throw function BV(t) {
						return new w(3301, !1)
					}();
					return e
				}
				listen(n, e, r, i) {
					const s = ep(e, "", "", "");
					return Xh(this._getPlayer(n), r, s, i), () => {}
				}
				command(n, e, r, i) {
					if ("register" == r) return void this.register(n, i[0]);
					if ("create" == r) return void this.create(n, e, i[0] || {});
					const s = this._getPlayer(n);
					switch (r) {
						case "play":
							s.play();
							break;
						case "pause":
							s.pause();
							break;
						case "reset":
							s.reset();
							break;
						case "restart":
							s.restart();
							break;
						case "finish":
							s.finish();
							break;
						case "init":
							s.init();
							break;
						case "setPosition":
							s.setPosition(parseFloat(i[0]));
							break;
						case "destroy":
							this.destroy(n)
					}
				}
			}
			const wx = "ng-animate-queued",
				mp = "ng-animate-disabled",
				jB = [],
				Cx = {
					namespaceId: "",
					setForRemoval: !1,
					setForMove: !1,
					hasAnimation: !1,
					removedBeforeQueried: !1
				},
				$B = {
					namespaceId: "",
					setForMove: !1,
					setForRemoval: !1,
					hasAnimation: !1,
					removedBeforeQueried: !0
				},
				cn = "__ng_removed";
			class yp {
				constructor(n, e = "") {
					this.namespaceId = e;
					const r = n && n.hasOwnProperty("value");
					if (this.value = function WB(t) {
							return t ?? null
						}(r ? n.value : n), r) {
						const s = $o(n);
						delete s.value, this.options = s
					} else this.options = {};
					this.options.params || (this.options.params = {})
				}
				get params() {
					return this.options.params
				}
				absorbOptions(n) {
					const e = n.params;
					if (e) {
						const r = this.options.params;
						Object.keys(e).forEach(i => {
							null == r[i] && (r[i] = e[i])
						})
					}
				}
			}
			const zo = "void",
				_p = new yp(zo);
			class UB {
				constructor(n, e, r) {
					this.id = n, this.hostElement = e, this._engine = r, this.players = [], this._triggers = new Map, this._queue = [], this._elementListeners = new Map, this._hostClassName = "ng-tns-" + n, dn(e, this._hostClassName)
				}
				listen(n, e, r, i) {
					if (!this._triggers.has(e)) throw function HV(t, n) {
						return new w(3302, !1)
					}();
					if (null == r || 0 == r.length) throw function jV(t) {
						return new w(3303, !1)
					}();
					if (! function qB(t) {
							return "start" == t || "done" == t
						}(r)) throw function $V(t, n) {
						return new w(3400, !1)
					}();
					const s = zt(this._elementListeners, n, []),
						o = {
							name: e,
							phase: r,
							callback: i
						};
					s.push(o);
					const a = zt(this._engine.statesByElement, n, new Map);
					return a.has(e) || (dn(n, au), dn(n, au + "-" + e), a.set(e, _p)), () => {
						this._engine.afterFlush(() => {
							const l = s.indexOf(o);
							l >= 0 && s.splice(l, 1), this._triggers.has(e) || a.delete(e)
						})
					}
				}
				register(n, e) {
					return !this._triggers.has(n) && (this._triggers.set(n, e), !0)
				}
				_getTrigger(n) {
					const e = this._triggers.get(n);
					if (!e) throw function UV(t) {
						return new w(3401, !1)
					}();
					return e
				}
				trigger(n, e, r, i = !0) {
					const s = this._getTrigger(e),
						o = new vp(this.id, e, n);
					let a = this._engine.statesByElement.get(n);
					a || (dn(n, au), dn(n, au + "-" + e), this._engine.statesByElement.set(n, a = new Map));
					let l = a.get(e);
					const u = new yp(r, this.id);
					if (!(r && r.hasOwnProperty("value")) && l && u.absorbOptions(l.options), a.set(e, u), l || (l = _p), u.value !== zo && l.value === u.value) {
						if (! function YB(t, n) {
								const e = Object.keys(t),
									r = Object.keys(n);
								if (e.length != r.length) return !1;
								for (let i = 0; i < e.length; i++) {
									const s = e[i];
									if (!n.hasOwnProperty(s) || t[s] !== n[s]) return !1
								}
								return !0
							}(l.params, u.params)) {
							const m = [],
								_ = s.matchStyles(l.value, l.params, m),
								y = s.matchStyles(u.value, u.params, m);
							m.length ? this._engine.reportError(m) : this._engine.afterFlush(() => {
								hi(n, _), Un(n, y)
							})
						}
						return
					}
					const f = zt(this._engine.playersByElement, n, []);
					f.forEach(m => {
						m.namespaceId == this.id && m.triggerName == e && m.queued && m.destroy()
					});
					let h = s.matchTransition(l.value, u.value, n, u.params),
						g = !1;
					if (!h) {
						if (!i) return;
						h = s.fallbackTransition, g = !0
					}
					return this._engine.totalQueuedPlayers++, this._queue.push({
						element: n,
						triggerName: e,
						transition: h,
						fromState: l,
						toState: u,
						player: o,
						isFallbackTransition: g
					}), g || (dn(n, wx), o.onStart(() => {
						ys(n, wx)
					})), o.onDone(() => {
						let m = this.players.indexOf(o);
						m >= 0 && this.players.splice(m, 1);
						const _ = this._engine.playersByElement.get(n);
						if (_) {
							let y = _.indexOf(o);
							y >= 0 && _.splice(y, 1)
						}
					}), this.players.push(o), f.push(o), o
				}
				deregister(n) {
					this._triggers.delete(n), this._engine.statesByElement.forEach(e => e.delete(n)), this._elementListeners.forEach((e, r) => {
						this._elementListeners.set(r, e.filter(i => i.name != n))
					})
				}
				clearElementCache(n) {
					this._engine.statesByElement.delete(n), this._elementListeners.delete(n);
					const e = this._engine.playersByElement.get(n);
					e && (e.forEach(r => r.destroy()), this._engine.playersByElement.delete(n))
				}
				_signalRemovalForInnerTriggers(n, e) {
					const r = this._engine.driver.query(n, lu, !0);
					r.forEach(i => {
						if (i[cn]) return;
						const s = this._engine.fetchNamespacesByElement(i);
						s.size ? s.forEach(o => o.triggerLeaveAnimation(i, e, !1, !0)) : this.clearElementCache(i)
					}), this._engine.afterFlushAnimationsDone(() => r.forEach(i => this.clearElementCache(i)))
				}
				triggerLeaveAnimation(n, e, r, i) {
					const s = this._engine.statesByElement.get(n),
						o = new Map;
					if (s) {
						const a = [];
						if (s.forEach((l, u) => {
								if (o.set(u, l.value), this._triggers.has(u)) {
									const c = this.trigger(n, u, zo, i);
									c && a.push(c)
								}
							}), a.length) return this._engine.markElementAsRemoved(this.id, n, !0, e, o), r && Lr(a).onDone(() => this._engine.processLeaveNode(n)), !0
					}
					return !1
				}
				prepareLeaveAnimationListeners(n) {
					const e = this._elementListeners.get(n),
						r = this._engine.statesByElement.get(n);
					if (e && r) {
						const i = new Set;
						e.forEach(s => {
							const o = s.name;
							if (i.has(o)) return;
							i.add(o);
							const l = this._triggers.get(o).fallbackTransition,
								u = r.get(o) || _p,
								c = new yp(zo),
								d = new vp(this.id, o, n);
							this._engine.totalQueuedPlayers++, this._queue.push({
								element: n,
								triggerName: o,
								transition: l,
								fromState: u,
								toState: c,
								player: d,
								isFallbackTransition: !0
							})
						})
					}
				}
				removeNode(n, e) {
					const r = this._engine;
					if (n.childElementCount && this._signalRemovalForInnerTriggers(n, e), this.triggerLeaveAnimation(n, e, !0)) return;
					let i = !1;
					if (r.totalAnimations) {
						const s = r.players.length ? r.playersByQueriedElement.get(n) : [];
						if (s && s.length) i = !0;
						else {
							let o = n;
							for (; o = o.parentNode;)
								if (r.statesByElement.get(o)) {
									i = !0;
									break
								}
						}
					}
					if (this.prepareLeaveAnimationListeners(n), i) r.markElementAsRemoved(this.id, n, !1, e);
					else {
						const s = n[cn];
						(!s || s === Cx) && (r.afterFlush(() => this.clearElementCache(n)), r.destroyInnerAnimations(n), r._onRemovalComplete(n, e))
					}
				}
				insertNode(n, e) {
					dn(n, this._hostClassName)
				}
				drainQueuedTransitions(n) {
					const e = [];
					return this._queue.forEach(r => {
						const i = r.player;
						if (i.destroyed) return;
						const s = r.element,
							o = this._elementListeners.get(s);
						o && o.forEach(a => {
							if (a.name == r.triggerName) {
								const l = ep(s, r.triggerName, r.fromState.value, r.toState.value);
								l._data = n, Xh(r.player, a.phase, l, a.callback)
							}
						}), i.markedForDestroy ? this._engine.afterFlush(() => {
							i.destroy()
						}) : e.push(r)
					}), this._queue = [], e.sort((r, i) => {
						const s = r.transition.ast.depCount,
							o = i.transition.ast.depCount;
						return 0 == s || 0 == o ? s - o : this._engine.driver.containsElement(r.element, i.element) ? 1 : -1
					})
				}
				destroy(n) {
					this.players.forEach(e => e.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, n)
				}
				elementContainsData(n) {
					let e = !1;
					return this._elementListeners.has(n) && (e = !0), e = !!this._queue.find(r => r.element === n) || e, e
				}
			}
			class GB {
				constructor(n, e, r) {
					this.bodyNode = n, this.driver = e, this._normalizer = r, this.players = [], this.newHostElements = new Map, this.playersByElement = new Map, this.playersByQueriedElement = new Map, this.statesByElement = new Map, this.disabledNodes = new Set, this.totalAnimations = 0, this.totalQueuedPlayers = 0, this._namespaceLookup = {}, this._namespaceList = [], this._flushFns = [], this._whenQuietFns = [], this.namespacesByHostElement = new Map, this.collectedEnterElements = [], this.collectedLeaveElements = [], this.onRemovalComplete = (i, s) => {}
				}
				_onRemovalComplete(n, e) {
					this.onRemovalComplete(n, e)
				}
				get queuedPlayers() {
					const n = [];
					return this._namespaceList.forEach(e => {
						e.players.forEach(r => {
							r.queued && n.push(r)
						})
					}), n
				}
				createNamespace(n, e) {
					const r = new UB(n, e, this);
					return this.bodyNode && this.driver.containsElement(this.bodyNode, e) ? this._balanceNamespaceList(r, e) : (this.newHostElements.set(e, r), this.collectEnterElement(e)), this._namespaceLookup[n] = r
				}
				_balanceNamespaceList(n, e) {
					const r = this._namespaceList,
						i = this.namespacesByHostElement;
					if (r.length - 1 >= 0) {
						let o = !1,
							a = this.driver.getParentElement(e);
						for (; a;) {
							const l = i.get(a);
							if (l) {
								const u = r.indexOf(l);
								r.splice(u + 1, 0, n), o = !0;
								break
							}
							a = this.driver.getParentElement(a)
						}
						o || r.unshift(n)
					} else r.push(n);
					return i.set(e, n), n
				}
				register(n, e) {
					let r = this._namespaceLookup[n];
					return r || (r = this.createNamespace(n, e)), r
				}
				registerTrigger(n, e, r) {
					let i = this._namespaceLookup[n];
					i && i.register(e, r) && this.totalAnimations++
				}
				destroy(n, e) {
					if (!n) return;
					const r = this._fetchNamespace(n);
					this.afterFlush(() => {
						this.namespacesByHostElement.delete(r.hostElement), delete this._namespaceLookup[n];
						const i = this._namespaceList.indexOf(r);
						i >= 0 && this._namespaceList.splice(i, 1)
					}), this.afterFlushAnimationsDone(() => r.destroy(e))
				}
				_fetchNamespace(n) {
					return this._namespaceLookup[n]
				}
				fetchNamespacesByElement(n) {
					const e = new Set,
						r = this.statesByElement.get(n);
					if (r)
						for (let i of r.values())
							if (i.namespaceId) {
								const s = this._fetchNamespace(i.namespaceId);
								s && e.add(s)
							} return e
				}
				trigger(n, e, r, i) {
					if (vu(e)) {
						const s = this._fetchNamespace(n);
						if (s) return s.trigger(e, r, i), !0
					}
					return !1
				}
				insertNode(n, e, r, i) {
					if (!vu(e)) return;
					const s = e[cn];
					if (s && s.setForRemoval) {
						s.setForRemoval = !1, s.setForMove = !0;
						const o = this.collectedLeaveElements.indexOf(e);
						o >= 0 && this.collectedLeaveElements.splice(o, 1)
					}
					if (n) {
						const o = this._fetchNamespace(n);
						o && o.insertNode(e, r)
					}
					i && this.collectEnterElement(e)
				}
				collectEnterElement(n) {
					this.collectedEnterElements.push(n)
				}
				markElementAsDisabled(n, e) {
					e ? this.disabledNodes.has(n) || (this.disabledNodes.add(n), dn(n, mp)) : this.disabledNodes.has(n) && (this.disabledNodes.delete(n), ys(n, mp))
				}
				removeNode(n, e, r, i) {
					if (vu(e)) {
						const s = n ? this._fetchNamespace(n) : null;
						if (s ? s.removeNode(e, i) : this.markElementAsRemoved(n, e, !1, i), r) {
							const o = this.namespacesByHostElement.get(e);
							o && o.id !== n && o.removeNode(e, i)
						}
					} else this._onRemovalComplete(e, i)
				}
				markElementAsRemoved(n, e, r, i, s) {
					this.collectedLeaveElements.push(e), e[cn] = {
						namespaceId: n,
						setForRemoval: i,
						hasAnimation: r,
						removedBeforeQueried: !1,
						previousTriggersValues: s
					}
				}
				listen(n, e, r, i, s) {
					return vu(e) ? this._fetchNamespace(n).listen(e, r, i, s) : () => {}
				}
				_buildInstruction(n, e, r, i, s) {
					return n.transition.build(this.driver, n.element, n.fromState.value, n.toState.value, r, i, n.fromState.options, n.toState.options, e, s)
				}
				destroyInnerAnimations(n) {
					let e = this.driver.query(n, lu, !0);
					e.forEach(r => this.destroyActiveAnimationsForElement(r)), 0 != this.playersByQueriedElement.size && (e = this.driver.query(n, sp, !0), e.forEach(r => this.finishActiveQueriedAnimationOnElement(r)))
				}
				destroyActiveAnimationsForElement(n) {
					const e = this.playersByElement.get(n);
					e && e.forEach(r => {
						r.queued ? r.markedForDestroy = !0 : r.destroy()
					})
				}
				finishActiveQueriedAnimationOnElement(n) {
					const e = this.playersByQueriedElement.get(n);
					e && e.forEach(r => r.finish())
				}
				whenRenderingDone() {
					return new Promise(n => {
						if (this.players.length) return Lr(this.players).onDone(() => n());
						n()
					})
				}
				processLeaveNode(n) {
					const e = n[cn];
					if (e && e.setForRemoval) {
						if (n[cn] = Cx, e.namespaceId) {
							this.destroyInnerAnimations(n);
							const r = this._fetchNamespace(e.namespaceId);
							r && r.clearElementCache(n)
						}
						this._onRemovalComplete(n, e.setForRemoval)
					}
					n.classList?.contains(mp) && this.markElementAsDisabled(n, !1), this.driver.query(n, ".ng-animate-disabled", !0).forEach(r => {
						this.markElementAsDisabled(r, !1)
					})
				}
				flush(n = -1) {
					let e = [];
					if (this.newHostElements.size && (this.newHostElements.forEach((r, i) => this._balanceNamespaceList(r, i)), this.newHostElements.clear()), this.totalAnimations && this.collectedEnterElements.length)
						for (let r = 0; r < this.collectedEnterElements.length; r++) dn(this.collectedEnterElements[r], "ng-star-inserted");
					if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
						const r = [];
						try {
							e = this._flushAnimations(r, n)
						} finally {
							for (let i = 0; i < r.length; i++) r[i]()
						}
					} else
						for (let r = 0; r < this.collectedLeaveElements.length; r++) this.processLeaveNode(this.collectedLeaveElements[r]);
					if (this.totalQueuedPlayers = 0, this.collectedEnterElements.length = 0, this.collectedLeaveElements.length = 0, this._flushFns.forEach(r => r()), this._flushFns = [], this._whenQuietFns.length) {
						const r = this._whenQuietFns;
						this._whenQuietFns = [], e.length ? Lr(e).onDone(() => {
							r.forEach(i => i())
						}) : r.forEach(i => i())
					}
				}
				reportError(n) {
					throw function GV(t) {
						return new w(3402, !1)
					}()
				}
				_flushAnimations(n, e) {
					const r = new mu,
						i = [],
						s = new Map,
						o = [],
						a = new Map,
						l = new Map,
						u = new Map,
						c = new Set;
					this.disabledNodes.forEach(R => {
						c.add(R);
						const N = this.driver.query(R, ".ng-animate-queued", !0);
						for (let B = 0; B < N.length; B++) c.add(N[B])
					});
					const d = this.bodyNode,
						f = Array.from(this.statesByElement.keys()),
						h = Ex(f, this.collectedEnterElements),
						g = new Map;
					let m = 0;
					h.forEach((R, N) => {
						const B = ip + m++;
						g.set(N, B), R.forEach(re => dn(re, B))
					});
					const _ = [],
						y = new Set,
						C = new Set;
					for (let R = 0; R < this.collectedLeaveElements.length; R++) {
						const N = this.collectedLeaveElements[R],
							B = N[cn];
						B && B.setForRemoval && (_.push(N), y.add(N), B.hasAnimation ? this.driver.query(N, ".ng-star-inserted", !0).forEach(re => y.add(re)) : C.add(N))
					}
					const v = new Map,
						I = Ex(f, Array.from(y));
					I.forEach((R, N) => {
						const B = ou + m++;
						v.set(N, B), R.forEach(re => dn(re, B))
					}), n.push(() => {
						h.forEach((R, N) => {
							const B = g.get(N);
							R.forEach(re => ys(re, B))
						}), I.forEach((R, N) => {
							const B = v.get(N);
							R.forEach(re => ys(re, B))
						}), _.forEach(R => {
							this.processLeaveNode(R)
						})
					});
					const K = [],
						ee = [];
					for (let R = this._namespaceList.length - 1; R >= 0; R--) this._namespaceList[R].drainQueuedTransitions(e).forEach(B => {
						const re = B.player,
							it = B.element;
						if (K.push(re), this.collectedEnterElements.length) {
							const ht = it[cn];
							if (ht && ht.setForMove) {
								if (ht.previousTriggersValues && ht.previousTriggersValues.has(B.triggerName)) {
									const Di = ht.previousTriggersValues.get(B.triggerName),
										hn = this.statesByElement.get(B.element);
									if (hn && hn.has(B.triggerName)) {
										const ic = hn.get(B.triggerName);
										ic.value = Di, hn.set(B.triggerName, ic)
									}
								}
								return void re.destroy()
							}
						}
						const Wn = !d || !this.driver.containsElement(d, it),
							Xt = v.get(it),
							$r = g.get(it),
							Fe = this._buildInstruction(B, r, $r, Xt, Wn);
						if (Fe.errors && Fe.errors.length) return void ee.push(Fe);
						if (Wn) return re.onStart(() => hi(it, Fe.fromStyles)), re.onDestroy(() => Un(it, Fe.toStyles)), void i.push(re);
						if (B.isFallbackTransition) return re.onStart(() => hi(it, Fe.fromStyles)), re.onDestroy(() => Un(it, Fe.toStyles)), void i.push(re);
						const fA = [];
						Fe.timelines.forEach(ht => {
							ht.stretchStartingKeyframe = !0, this.disabledNodes.has(ht.element) || fA.push(ht)
						}), Fe.timelines = fA, r.append(it, Fe.timelines), o.push({
							instruction: Fe,
							player: re,
							element: it
						}), Fe.queriedElements.forEach(ht => zt(a, ht, []).push(re)), Fe.preStyleProps.forEach((ht, Di) => {
							if (ht.size) {
								let hn = l.get(Di);
								hn || l.set(Di, hn = new Set), ht.forEach((ic, wg) => hn.add(wg))
							}
						}), Fe.postStyleProps.forEach((ht, Di) => {
							let hn = u.get(Di);
							hn || u.set(Di, hn = new Set), ht.forEach((ic, wg) => hn.add(wg))
						})
					});
					if (ee.length) {
						const R = [];
						ee.forEach(N => {
							R.push(function zV(t, n) {
								return new w(3505, !1)
							}())
						}), K.forEach(N => N.destroy()), this.reportError(R)
					}
					const Te = new Map,
						Qt = new Map;
					o.forEach(R => {
						const N = R.element;
						r.has(N) && (Qt.set(N, N), this._beforeAnimationBuild(R.player.namespaceId, R.instruction, Te))
					}), i.forEach(R => {
						const N = R.element;
						this._getPreviousPlayers(N, !1, R.namespaceId, R.triggerName, null).forEach(re => {
							zt(Te, N, []).push(re), re.destroy()
						})
					});
					const Yt = _.filter(R => Ax(R, l, u)),
						Zt = new Map;
					xx(Zt, this.driver, C, u, dr).forEach(R => {
						Ax(R, l, u) && Yt.push(R)
					});
					const vr = new Map;
					h.forEach((R, N) => {
						xx(vr, this.driver, new Set(R), l, "!")
					}), Yt.forEach(R => {
						const N = Zt.get(R),
							B = vr.get(R);
						Zt.set(R, new Map([...Array.from(N?.entries() ?? []), ...Array.from(B?.entries() ?? [])]))
					});
					const Tn = [],
						Rs = [],
						Os = {};
					o.forEach(R => {
						const {
							element: N,
							player: B,
							instruction: re
						} = R;
						if (r.has(N)) {
							if (c.has(N)) return B.onDestroy(() => Un(N, re.toStyles)), B.disabled = !0, B.overrideTotalTime(re.totalTime), void i.push(B);
							let it = Os;
							if (Qt.size > 1) {
								let Xt = N;
								const $r = [];
								for (; Xt = Xt.parentNode;) {
									const Fe = Qt.get(Xt);
									if (Fe) {
										it = Fe;
										break
									}
									$r.push(Xt)
								}
								$r.forEach(Fe => Qt.set(Fe, it))
							}
							const Wn = this._buildAnimation(B.namespaceId, re, Te, s, vr, Zt);
							if (B.setRealPlayer(Wn), it === Os) Tn.push(B);
							else {
								const Xt = this.playersByElement.get(it);
								Xt && Xt.length && (B.parentPlayer = Lr(Xt)), i.push(B)
							}
						} else hi(N, re.fromStyles), B.onDestroy(() => Un(N, re.toStyles)), Rs.push(B), c.has(N) && i.push(B)
					}), Rs.forEach(R => {
						const N = s.get(R.element);
						if (N && N.length) {
							const B = Lr(N);
							R.setRealPlayer(B)
						}
					}), i.forEach(R => {
						R.parentPlayer ? R.syncPlayerEvents(R.parentPlayer) : R.destroy()
					});
					for (let R = 0; R < _.length; R++) {
						const N = _[R],
							B = N[cn];
						if (ys(N, ou), B && B.hasAnimation) continue;
						let re = [];
						if (a.size) {
							let Wn = a.get(N);
							Wn && Wn.length && re.push(...Wn);
							let Xt = this.driver.query(N, sp, !0);
							for (let $r = 0; $r < Xt.length; $r++) {
								let Fe = a.get(Xt[$r]);
								Fe && Fe.length && re.push(...Fe)
							}
						}
						const it = re.filter(Wn => !Wn.destroyed);
						it.length ? KB(this, N, it) : this.processLeaveNode(N)
					}
					return _.length = 0, Tn.forEach(R => {
						this.players.push(R), R.onDone(() => {
							R.destroy();
							const N = this.players.indexOf(R);
							this.players.splice(N, 1)
						}), R.play()
					}), Tn
				}
				elementContainsData(n, e) {
					let r = !1;
					const i = e[cn];
					return i && i.setForRemoval && (r = !0), this.playersByElement.has(e) && (r = !0), this.playersByQueriedElement.has(e) && (r = !0), this.statesByElement.has(e) && (r = !0), this._fetchNamespace(n).elementContainsData(e) || r
				}
				afterFlush(n) {
					this._flushFns.push(n)
				}
				afterFlushAnimationsDone(n) {
					this._whenQuietFns.push(n)
				}
				_getPreviousPlayers(n, e, r, i, s) {
					let o = [];
					if (e) {
						const a = this.playersByQueriedElement.get(n);
						a && (o = a)
					} else {
						const a = this.playersByElement.get(n);
						if (a) {
							const l = !s || s == zo;
							a.forEach(u => {
								u.queued || !l && u.triggerName != i || o.push(u)
							})
						}
					}
					return (r || i) && (o = o.filter(a => !(r && r != a.namespaceId || i && i != a.triggerName))), o
				}
				_beforeAnimationBuild(n, e, r) {
					const s = e.element,
						o = e.isRemovalTransition ? void 0 : n,
						a = e.isRemovalTransition ? void 0 : e.triggerName;
					for (const l of e.timelines) {
						const u = l.element,
							c = u !== s,
							d = zt(r, u, []);
						this._getPreviousPlayers(u, c, o, a, e.toState).forEach(h => {
							const g = h.getRealPlayer();
							g.beforeDestroy && g.beforeDestroy(), h.destroy(), d.push(h)
						})
					}
					hi(s, e.fromStyles)
				}
				_buildAnimation(n, e, r, i, s, o) {
					const a = e.triggerName,
						l = e.element,
						u = [],
						c = new Set,
						d = new Set,
						f = e.timelines.map(g => {
							const m = g.element;
							c.add(m);
							const _ = m[cn];
							if (_ && _.removedBeforeQueried) return new jo(g.duration, g.delay);
							const y = m !== l,
								C = function QB(t) {
									const n = [];
									return Mx(t, n), n
								}((r.get(m) || jB).map(Te => Te.getRealPlayer())).filter(Te => !!Te.element && Te.element === m),
								v = s.get(m),
								I = o.get(m),
								K = XD(0, this._normalizer, 0, g.keyframes, v, I),
								ee = this._buildPlayer(g, K, C);
							if (g.subTimeline && i && d.add(m), y) {
								const Te = new vp(n, a, m);
								Te.setRealPlayer(ee), u.push(Te)
							}
							return ee
						});
					u.forEach(g => {
						zt(this.playersByQueriedElement, g.element, []).push(g), g.onDone(() => function zB(t, n, e) {
							let r = t.get(n);
							if (r) {
								if (r.length) {
									const i = r.indexOf(e);
									r.splice(i, 1)
								}
								0 == r.length && t.delete(n)
							}
							return r
						}(this.playersByQueriedElement, g.element, g))
					}), c.forEach(g => dn(g, ax));
					const h = Lr(f);
					return h.onDestroy(() => {
						c.forEach(g => ys(g, ax)), Un(l, e.toStyles)
					}), d.forEach(g => {
						zt(i, g, []).push(h)
					}), h
				}
				_buildPlayer(n, e, r) {
					return e.length > 0 ? this.driver.animate(n.element, e, n.duration, n.delay, n.easing, r) : new jo(n.duration, n.delay)
				}
			}
			class vp {
				constructor(n, e, r) {
					this.namespaceId = n, this.triggerName = e, this.element = r, this._player = new jo, this._containsRealPlayer = !1, this._queuedCallbacks = new Map, this.destroyed = !1, this.markedForDestroy = !1, this.disabled = !1, this.queued = !0, this.totalTime = 0
				}
				setRealPlayer(n) {
					this._containsRealPlayer || (this._player = n, this._queuedCallbacks.forEach((e, r) => {
						e.forEach(i => Xh(n, r, void 0, i))
					}), this._queuedCallbacks.clear(), this._containsRealPlayer = !0, this.overrideTotalTime(n.totalTime), this.queued = !1)
				}
				getRealPlayer() {
					return this._player
				}
				overrideTotalTime(n) {
					this.totalTime = n
				}
				syncPlayerEvents(n) {
					const e = this._player;
					e.triggerCallback && n.onStart(() => e.triggerCallback("start")), n.onDone(() => this.finish()), n.onDestroy(() => this.destroy())
				}
				_queueEvent(n, e) {
					zt(this._queuedCallbacks, n, []).push(e)
				}
				onDone(n) {
					this.queued && this._queueEvent("done", n), this._player.onDone(n)
				}
				onStart(n) {
					this.queued && this._queueEvent("start", n), this._player.onStart(n)
				}
				onDestroy(n) {
					this.queued && this._queueEvent("destroy", n), this._player.onDestroy(n)
				}
				init() {
					this._player.init()
				}
				hasStarted() {
					return !this.queued && this._player.hasStarted()
				}
				play() {
					!this.queued && this._player.play()
				}
				pause() {
					!this.queued && this._player.pause()
				}
				restart() {
					!this.queued && this._player.restart()
				}
				finish() {
					this._player.finish()
				}
				destroy() {
					this.destroyed = !0, this._player.destroy()
				}
				reset() {
					!this.queued && this._player.reset()
				}
				setPosition(n) {
					this.queued || this._player.setPosition(n)
				}
				getPosition() {
					return this.queued ? 0 : this._player.getPosition()
				}
				triggerCallback(n) {
					const e = this._player;
					e.triggerCallback && e.triggerCallback(n)
				}
			}

			function vu(t) {
				return t && 1 === t.nodeType
			}

			function Dx(t, n) {
				const e = t.style.display;
				return t.style.display = n ?? "none", e
			}

			function xx(t, n, e, r, i) {
				const s = [];
				e.forEach(l => s.push(Dx(l)));
				const o = [];
				r.forEach((l, u) => {
					const c = new Map;
					l.forEach(d => {
						const f = n.computeStyle(u, d, i);
						c.set(d, f), (!f || 0 == f.length) && (u[cn] = $B, o.push(u))
					}), t.set(u, c)
				});
				let a = 0;
				return e.forEach(l => Dx(l, s[a++])), o
			}

			function Ex(t, n) {
				const e = new Map;
				if (t.forEach(a => e.set(a, [])), 0 == n.length) return e;
				const i = new Set(n),
					s = new Map;

				function o(a) {
					if (!a) return 1;
					let l = s.get(a);
					if (l) return l;
					const u = a.parentNode;
					return l = e.has(u) ? u : i.has(u) ? 1 : o(u), s.set(a, l), l
				}
				return n.forEach(a => {
					const l = o(a);
					1 !== l && e.get(l).push(a)
				}), e
			}

			function dn(t, n) {
				t.classList?.add(n)
			}

			function ys(t, n) {
				t.classList?.remove(n)
			}

			function KB(t, n, e) {
				Lr(e).onDone(() => t.processLeaveNode(n))
			}

			function Mx(t, n) {
				for (let e = 0; e < t.length; e++) {
					const r = t[e];
					r instanceof YD ? Mx(r.players, n) : n.push(r)
				}
			}

			function Ax(t, n, e) {
				const r = e.get(t);
				if (!r) return !1;
				let i = n.get(t);
				return i ? r.forEach(s => i.add(s)) : n.set(t, r), e.delete(t), !0
			}
			class bu {
				constructor(n, e, r) {
					this.bodyNode = n, this._driver = e, this._normalizer = r, this._triggerCache = {}, this.onRemovalComplete = (i, s) => {}, this._transitionEngine = new GB(n, e, r), this._timelineEngine = new LB(n, e, r), this._transitionEngine.onRemovalComplete = (i, s) => this.onRemovalComplete(i, s)
				}
				registerTrigger(n, e, r, i, s) {
					const o = n + "-" + i;
					let a = this._triggerCache[o];
					if (!a) {
						const l = [],
							c = up(this._driver, s, l, []);
						if (l.length) throw function kV(t, n) {
							return new w(3404, !1)
						}();
						a = function RB(t, n, e) {
							return new OB(t, n, e)
						}(i, c, this._normalizer), this._triggerCache[o] = a
					}
					this._transitionEngine.registerTrigger(e, i, a)
				}
				register(n, e) {
					this._transitionEngine.register(n, e)
				}
				destroy(n, e) {
					this._transitionEngine.destroy(n, e)
				}
				onInsert(n, e, r, i) {
					this._transitionEngine.insertNode(n, e, r, i)
				}
				onRemove(n, e, r, i) {
					this._transitionEngine.removeNode(n, e, i || !1, r)
				}
				disableAnimations(n, e) {
					this._transitionEngine.markElementAsDisabled(n, e)
				}
				process(n, e, r, i) {
					if ("@" == r.charAt(0)) {
						const [s, o] = JD(r);
						this._timelineEngine.command(s, e, o, i)
					} else this._transitionEngine.trigger(n, e, r, i)
				}
				listen(n, e, r, i, s) {
					if ("@" == r.charAt(0)) {
						const [o, a] = JD(r);
						return this._timelineEngine.listen(o, e, a, s)
					}
					return this._transitionEngine.listen(n, e, r, i, s)
				}
				flush(n = -1) {
					this._transitionEngine.flush(n)
				}
				get players() {
					return this._transitionEngine.players.concat(this._timelineEngine.players)
				}
				whenRenderingDone() {
					return this._transitionEngine.whenRenderingDone()
				}
			}
			let XB = (() => {
				class t {
					constructor(e, r, i) {
						this._element = e, this._startStyles = r, this._endStyles = i, this._state = 0;
						let s = t.initialStylesByElement.get(e);
						s || t.initialStylesByElement.set(e, s = new Map), this._initialStyles = s
					}
					start() {
						this._state < 1 && (this._startStyles && Un(this._element, this._startStyles, this._initialStyles), this._state = 1)
					}
					finish() {
						this.start(), this._state < 2 && (Un(this._element, this._initialStyles), this._endStyles && (Un(this._element, this._endStyles), this._endStyles = null), this._state = 1)
					}
					destroy() {
						this.finish(), this._state < 3 && (t.initialStylesByElement.delete(this._element), this._startStyles && (hi(this._element, this._startStyles), this._endStyles = null), this._endStyles && (hi(this._element, this._endStyles), this._endStyles = null), Un(this._element, this._initialStyles), this._state = 3)
					}
				}
				return t.initialStylesByElement = new WeakMap, t
			})();

			function bp(t) {
				let n = null;
				return t.forEach((e, r) => {
					(function JB(t) {
						return "display" === t || "position" === t
					})(r) && (n = n || new Map, n.set(r, e))
				}), n
			}
			class Sx {
				constructor(n, e, r, i) {
					this.element = n, this.keyframes = e, this.options = r, this._specialStyles = i, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._initialized = !1, this._finished = !1, this._started = !1, this._destroyed = !1, this._originalOnDoneFns = [], this._originalOnStartFns = [], this.time = 0, this.parentPlayer = null, this.currentSnapshot = new Map, this._duration = r.duration, this._delay = r.delay || 0, this.time = this._duration + this._delay
				}
				_onFinish() {
					this._finished || (this._finished = !0, this._onDoneFns.forEach(n => n()), this._onDoneFns = [])
				}
				init() {
					this._buildPlayer(), this._preparePlayerBeforeStart()
				}
				_buildPlayer() {
					if (this._initialized) return;
					this._initialized = !0;
					const n = this.keyframes;
					this.domPlayer = this._triggerWebAnimation(this.element, n, this.options), this._finalKeyframe = n.length ? n[n.length - 1] : new Map, this.domPlayer.addEventListener("finish", () => this._onFinish())
				}
				_preparePlayerBeforeStart() {
					this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
				}
				_convertKeyframesToObject(n) {
					const e = [];
					return n.forEach(r => {
						e.push(Object.fromEntries(r))
					}), e
				}
				_triggerWebAnimation(n, e, r) {
					return n.animate(this._convertKeyframesToObject(e), r)
				}
				onStart(n) {
					this._originalOnStartFns.push(n), this._onStartFns.push(n)
				}
				onDone(n) {
					this._originalOnDoneFns.push(n), this._onDoneFns.push(n)
				}
				onDestroy(n) {
					this._onDestroyFns.push(n)
				}
				play() {
					this._buildPlayer(), this.hasStarted() || (this._onStartFns.forEach(n => n()), this._onStartFns = [], this._started = !0, this._specialStyles && this._specialStyles.start()), this.domPlayer.play()
				}
				pause() {
					this.init(), this.domPlayer.pause()
				}
				finish() {
					this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), this.domPlayer.finish()
				}
				reset() {
					this._resetDomPlayerState(), this._destroyed = !1, this._finished = !1, this._started = !1, this._onStartFns = this._originalOnStartFns, this._onDoneFns = this._originalOnDoneFns
				}
				_resetDomPlayerState() {
					this.domPlayer && this.domPlayer.cancel()
				}
				restart() {
					this.reset(), this.play()
				}
				hasStarted() {
					return this._started
				}
				destroy() {
					this._destroyed || (this._destroyed = !0, this._resetDomPlayerState(), this._onFinish(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(n => n()), this._onDestroyFns = [])
				}
				setPosition(n) {
					void 0 === this.domPlayer && this.init(), this.domPlayer.currentTime = n * this.time
				}
				getPosition() {
					return this.domPlayer.currentTime / this.time
				}
				get totalTime() {
					return this._delay + this._duration
				}
				beforeDestroy() {
					const n = new Map;
					this.hasStarted() && this._finalKeyframe.forEach((r, i) => {
						"offset" !== i && n.set(i, this._finished ? r : hx(this.element, i))
					}), this.currentSnapshot = n
				}
				triggerCallback(n) {
					const e = "start" === n ? this._onStartFns : this._onDoneFns;
					e.forEach(r => r()), e.length = 0
				}
			}
			class eH {
				validateStyleProperty(n) {
					return !0
				}
				validateAnimatableStyleProperty(n) {
					return !0
				}
				matchesElement(n, e) {
					return !1
				}
				containsElement(n, e) {
					return rx(n, e)
				}
				getParentElement(n) {
					return np(n)
				}
				query(n, e, r) {
					return ix(n, e, r)
				}
				computeStyle(n, e, r) {
					return window.getComputedStyle(n)[e]
				}
				animate(n, e, r, i, s, o = []) {
					const l = {
						duration: r,
						delay: i,
						fill: 0 == i ? "both" : "forwards"
					};
					s && (l.easing = s);
					const u = new Map,
						c = o.filter(h => h instanceof Sx);
					(function iB(t, n) {
						return 0 === t || 0 === n
					})(r, i) && c.forEach(h => {
						h.currentSnapshot.forEach((g, m) => u.set(m, g))
					});
					let d = function eB(t) {
						return t.length ? t[0] instanceof Map ? t : t.map(n => lx(n)) : []
					}(e).map(h => Pr(h));
					d = function sB(t, n, e) {
						if (e.size && n.length) {
							let r = n[0],
								i = [];
							if (e.forEach((s, o) => {
									r.has(o) || i.push(o), r.set(o, s)
								}), i.length)
								for (let s = 1; s < n.length; s++) {
									let o = n[s];
									i.forEach(a => o.set(a, hx(t, a)))
								}
						}
						return n
					}(n, d, u);
					const f = function ZB(t, n) {
						let e = null,
							r = null;
						return Array.isArray(n) && n.length ? (e = bp(n[0]), n.length > 1 && (r = bp(n[n.length - 1]))) : n instanceof Map && (e = bp(n)), e || r ? new XB(t, e, r) : null
					}(n, d);
					return new Sx(n, d, l, f)
				}
			}
			let tH = (() => {
				class t extends qD {
					constructor(e, r) {
						super(), this._nextAnimationId = 0, this._renderer = e.createRenderer(r.body, {
							id: "0",
							encapsulation: gn.None,
							styles: [],
							data: {
								animation: []
							}
						})
					}
					build(e) {
						const r = this._nextAnimationId.toString();
						this._nextAnimationId++;
						const i = Array.isArray(e) ? KD(e) : e;
						return Ix(this._renderer, null, r, "register", [i]), new nH(r, this._renderer)
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(io), b(oe))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();
			class nH extends class lV {} {
				constructor(n, e) {
					super(), this._id = n, this._renderer = e
				}
				create(n, e) {
					return new rH(this._id, n, e || {}, this._renderer)
				}
			}
			class rH {
				constructor(n, e, r, i) {
					this.id = n, this.element = e, this._renderer = i, this.parentPlayer = null, this._started = !1, this.totalTime = 0, this._command("create", r)
				}
				_listen(n, e) {
					return this._renderer.listen(this.element, `@@${this.id}:${n}`, e)
				}
				_command(n, ...e) {
					return Ix(this._renderer, this.element, this.id, n, e)
				}
				onDone(n) {
					this._listen("done", n)
				}
				onStart(n) {
					this._listen("start", n)
				}
				onDestroy(n) {
					this._listen("destroy", n)
				}
				init() {
					this._command("init")
				}
				hasStarted() {
					return this._started
				}
				play() {
					this._command("play"), this._started = !0
				}
				pause() {
					this._command("pause")
				}
				restart() {
					this._command("restart")
				}
				finish() {
					this._command("finish")
				}
				destroy() {
					this._command("destroy")
				}
				reset() {
					this._command("reset"), this._started = !1
				}
				setPosition(n) {
					this._command("setPosition", n)
				}
				getPosition() {
					return this._renderer.engine.players[+this.id]?.getPosition() ?? 0
				}
			}

			function Ix(t, n, e, r, i) {
				return t.setProperty(n, `@@${e}:${r}`, i)
			}
			const Tx = "@.disabled";
			let iH = (() => {
				class t {
					constructor(e, r, i) {
						this.delegate = e, this.engine = r, this._zone = i, this._currentId = 0, this._microtaskId = 1, this._animationCallbacksBuffer = [], this._rendererCache = new Map, this._cdRecurDepth = 0, this.promise = Promise.resolve(0), r.onRemovalComplete = (s, o) => {
							const a = o?.parentNode(s);
							a && o.removeChild(a, s)
						}
					}
					createRenderer(e, r) {
						const s = this.delegate.createRenderer(e, r);
						if (!(e && r && r.data && r.data.animation)) {
							let c = this._rendererCache.get(s);
							return c || (c = new Fx("", s, this.engine), this._rendererCache.set(s, c)), c
						}
						const o = r.id,
							a = r.id + "-" + this._currentId;
						this._currentId++, this.engine.register(a, e);
						const l = c => {
							Array.isArray(c) ? c.forEach(l) : this.engine.registerTrigger(o, a, e, c.name, c)
						};
						return r.data.animation.forEach(l), new sH(this, a, s, this.engine)
					}
					begin() {
						this._cdRecurDepth++, this.delegate.begin && this.delegate.begin()
					}
					_scheduleCountTask() {
						this.promise.then(() => {
							this._microtaskId++
						})
					}
					scheduleListenerCallback(e, r, i) {
						e >= 0 && e < this._microtaskId ? this._zone.run(() => r(i)) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then(() => {
							this._zone.run(() => {
								this._animationCallbacksBuffer.forEach(s => {
									const [o, a] = s;
									o(a)
								}), this._animationCallbacksBuffer = []
							})
						}), this._animationCallbacksBuffer.push([r, i]))
					}
					end() {
						this._cdRecurDepth--, 0 == this._cdRecurDepth && this._zone.runOutsideAngular(() => {
							this._scheduleCountTask(), this.engine.flush(this._microtaskId)
						}), this.delegate.end && this.delegate.end()
					}
					whenRenderingDone() {
						return this.engine.whenRenderingDone()
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(io), b(bu), b(se))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();
			class Fx {
				constructor(n, e, r) {
					this.namespaceId = n, this.delegate = e, this.engine = r, this.destroyNode = this.delegate.destroyNode ? i => e.destroyNode(i) : null
				}
				get data() {
					return this.delegate.data
				}
				destroy() {
					this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy()
				}
				createElement(n, e) {
					return this.delegate.createElement(n, e)
				}
				createComment(n) {
					return this.delegate.createComment(n)
				}
				createText(n) {
					return this.delegate.createText(n)
				}
				appendChild(n, e) {
					this.delegate.appendChild(n, e), this.engine.onInsert(this.namespaceId, e, n, !1)
				}
				insertBefore(n, e, r, i = !0) {
					this.delegate.insertBefore(n, e, r), this.engine.onInsert(this.namespaceId, e, n, i)
				}
				removeChild(n, e, r) {
					this.engine.onRemove(this.namespaceId, e, this.delegate, r)
				}
				selectRootElement(n, e) {
					return this.delegate.selectRootElement(n, e)
				}
				parentNode(n) {
					return this.delegate.parentNode(n)
				}
				nextSibling(n) {
					return this.delegate.nextSibling(n)
				}
				setAttribute(n, e, r, i) {
					this.delegate.setAttribute(n, e, r, i)
				}
				removeAttribute(n, e, r) {
					this.delegate.removeAttribute(n, e, r)
				}
				addClass(n, e) {
					this.delegate.addClass(n, e)
				}
				removeClass(n, e) {
					this.delegate.removeClass(n, e)
				}
				setStyle(n, e, r, i) {
					this.delegate.setStyle(n, e, r, i)
				}
				removeStyle(n, e, r) {
					this.delegate.removeStyle(n, e, r)
				}
				setProperty(n, e, r) {
					"@" == e.charAt(0) && e == Tx ? this.disableAnimations(n, !!r) : this.delegate.setProperty(n, e, r)
				}
				setValue(n, e) {
					this.delegate.setValue(n, e)
				}
				listen(n, e, r) {
					return this.delegate.listen(n, e, r)
				}
				disableAnimations(n, e) {
					this.engine.disableAnimations(n, e)
				}
			}
			class sH extends Fx {
				constructor(n, e, r, i) {
					super(e, r, i), this.factory = n, this.namespaceId = e
				}
				setProperty(n, e, r) {
					"@" == e.charAt(0) ? "." == e.charAt(1) && e == Tx ? this.disableAnimations(n, r = void 0 === r || !!r) : this.engine.process(this.namespaceId, n, e.slice(1), r) : this.delegate.setProperty(n, e, r)
				}
				listen(n, e, r) {
					if ("@" == e.charAt(0)) {
						const i = function oH(t) {
							switch (t) {
								case "body":
									return document.body;
								case "document":
									return document;
								case "window":
									return window;
								default:
									return t
							}
						}(n);
						let s = e.slice(1),
							o = "";
						return "@" != s.charAt(0) && ([s, o] = function aH(t) {
							const n = t.indexOf(".");
							return [t.substring(0, n), t.slice(n + 1)]
						}(s)), this.engine.listen(this.namespaceId, i, s, o, a => {
							this.factory.scheduleListenerCallback(a._data || -1, r, a)
						})
					}
					return this.delegate.listen(n, e, r)
				}
			}
			const Rx = [{
					provide: qD,
					useClass: tH
				}, {
					provide: pp,
					useFactory: function uH() {
						return new SB
					}
				}, {
					provide: bu,
					useClass: (() => {
						class t extends bu {
							constructor(e, r, i, s) {
								super(e.body, r, i)
							}
							ngOnDestroy() {
								this.flush()
							}
						}
						return t.\u0275fac = function(e) {
							return new(e || t)(b(oe), b(rp), b(pp), b(Mo))
						}, t.\u0275prov = E({
							token: t,
							factory: t.\u0275fac
						}), t
					})()
				}, {
					provide: io,
					useFactory: function cH(t, n, e) {
						return new iH(t, n, e)
					},
					deps: [zl, bu, se]
				}],
				wp = [{
					provide: rp,
					useFactory: () => new eH
				}, {
					provide: ps,
					useValue: "BrowserAnimations"
				}, ...Rx],
				Ox = [{
					provide: rp,
					useClass: sx
				}, {
					provide: ps,
					useValue: "NoopAnimations"
				}, ...Rx];
			let dH = (() => {
				class t {
					static withConfig(e) {
						return {
							ngModule: t,
							providers: e.disableAnimations ? Ox : wp
						}
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275mod = de({
					type: t
				}), t.\u0275inj = ce({
					providers: wp,
					imports: [bC]
				}), t
			})();
			class qt extends Re {
				constructor(n) {
					super(), this._value = n
				}
				get value() {
					return this.getValue()
				}
				_subscribe(n) {
					const e = super._subscribe(n);
					return !e.closed && n.next(this._value), e
				}
				getValue() {
					const {
						hasError: n,
						thrownError: e,
						_value: r
					} = this;
					if (n) throw e;
					return this._throwIfClosed(), r
				}
				next(n) {
					super.next(this._value = n)
				}
			}
			const Cu = ks(t => function() {
				t(this), this.name = "EmptyError", this.message = "no elements in sequence"
			});

			function Cp(...t) {
				const n = Ls(t),
					e = $g(t),
					{
						args: r,
						keys: i
					} = EC(t);
				if (0 === r.length) return $e([], n);
				const s = new Ce(function fH(t, n, e = br) {
					return r => {
						kx(n, () => {
							const {
								length: i
							} = t, s = new Array(i);
							let o = i,
								a = i;
							for (let l = 0; l < i; l++) kx(n, () => {
								const u = $e(t[l], n);
								let c = !1;
								u.subscribe(Oe(r, d => {
									s[l] = d, c || (c = !0, a--), a || r.next(e(s.slice()))
								}, () => {
									--o || r.complete()
								}))
							}, r)
						}, r)
					}
				}(r, n, i ? o => MC(i, o) : br));
				return e ? s.pipe(xh(e)) : s
			}

			function kx(t, n, e) {
				t ? qn(e, t, n) : n()
			}

			function Du(...t) {
				return function hH() {
					return Ei(1)
				}()($e(t, Ls(t)))
			}

			function Nx(t) {
				return new Ce(n => {
					Ot(t()).subscribe(n)
				})
			}

			function _s(t, n) {
				const e = ne(t) ? t : () => t,
					r = i => i.error(e());
				return new Ce(n ? i => n.schedule(r, 0, i) : r)
			}

			function Dp() {
				return Ve((t, n) => {
					let e = null;
					t._refCount++;
					const r = Oe(n, void 0, void 0, void 0, () => {
						if (!t || t._refCount <= 0 || 0 < --t._refCount) return void(e = null);
						const i = t._connection,
							s = e;
						e = null, i && (!s || i === s) && i.unsubscribe(), n.unsubscribe()
					});
					t.subscribe(r), r.closed || (e = t.connect())
				})
			}
			class Lx extends Ce {
				constructor(n, e) {
					super(), this.source = n, this.subjectFactory = e, this._subject = null, this._refCount = 0, this._connection = null, Ig(n) && (this.lift = n.lift)
				}
				_subscribe(n) {
					return this.getSubject().subscribe(n)
				}
				getSubject() {
					const n = this._subject;
					return (!n || n.isStopped) && (this._subject = this.subjectFactory()), this._subject
				}
				_teardown() {
					this._refCount = 0;
					const {
						_connection: n
					} = this;
					this._subject = this._connection = null, n?.unsubscribe()
				}
				connect() {
					let n = this._connection;
					if (!n) {
						n = this._connection = new Et;
						const e = this.getSubject();
						n.add(this.source.subscribe(Oe(e, void 0, () => {
							this._teardown(), e.complete()
						}, r => {
							this._teardown(), e.error(r)
						}, () => this._teardown()))), n.closed && (this._connection = null, n = Et.EMPTY)
					}
					return n
				}
				refCount() {
					return Dp()(this)
				}
			}

			function Gn(t, n) {
				return Ve((e, r) => {
					let i = null,
						s = 0,
						o = !1;
					const a = () => o && !i && r.complete();
					e.subscribe(Oe(r, l => {
						i?.unsubscribe();
						let u = 0;
						const c = s++;
						Ot(t(l, c)).subscribe(i = Oe(r, d => r.next(n ? n(l, d, c, u++) : d), () => {
							i = null, a()
						}))
					}, () => {
						o = !0, a()
					}))
				})
			}

			function Vr(t) {
				return t <= 0 ? () => Fn : Ve((n, e) => {
					let r = 0;
					n.subscribe(Oe(e, i => {
						++r <= t && (e.next(i), t <= r && e.complete())
					}))
				})
			}

			function Wo(...t) {
				const n = Ls(t);
				return Ve((e, r) => {
					(n ? Du(t, e, n) : Du(t, e)).subscribe(r)
				})
			}

			function xu(t) {
				return Ve((n, e) => {
					let r = !1;
					n.subscribe(Oe(e, i => {
						r = !0, e.next(i)
					}, () => {
						r || e.next(t), e.complete()
					}))
				})
			}

			function Px(t = pH) {
				return Ve((n, e) => {
					let r = !1;
					n.subscribe(Oe(e, i => {
						r = !0, e.next(i)
					}, () => r ? e.complete() : e.error(t())))
				})
			}

			function pH() {
				return new Cu
			}

			function Br(t, n) {
				const e = arguments.length >= 2;
				return r => r.pipe(t ? Gt((i, s) => t(i, s, r)) : br, Vr(1), e ? xu(n) : Px(() => new Cu))
			}

			function je(t, n, e) {
				const r = ne(t) || n || e ? {
					next: t,
					error: n,
					complete: e
				} : t;
				return r ? Ve((i, s) => {
					var o;
					null === (o = r.subscribe) || void 0 === o || o.call(r);
					let a = !0;
					i.subscribe(Oe(s, l => {
						var u;
						null === (u = r.next) || void 0 === u || u.call(r, l), s.next(l)
					}, () => {
						var l;
						a = !1, null === (l = r.complete) || void 0 === l || l.call(r), s.complete()
					}, l => {
						var u;
						a = !1, null === (u = r.error) || void 0 === u || u.call(r, l), s.error(l)
					}, () => {
						var l, u;
						a && (null === (l = r.unsubscribe) || void 0 === l || l.call(r)), null === (u = r.finalize) || void 0 === u || u.call(r)
					}))
				}) : br
			}

			function hr(t) {
				return Ve((n, e) => {
					let s, r = null,
						i = !1;
					r = n.subscribe(Oe(e, void 0, void 0, o => {
						s = Ot(t(o, hr(t)(n))), r ? (r.unsubscribe(), r = null, s.subscribe(e)) : i = !0
					})), i && (r.unsubscribe(), r = null, s.subscribe(e))
				})
			}

			function gH(t, n, e, r, i) {
				return (s, o) => {
					let a = e,
						l = n,
						u = 0;
					s.subscribe(Oe(o, c => {
						const d = u++;
						l = a ? t(l, c, d) : (a = !0, c), r && o.next(l)
					}, i && (() => {
						a && o.next(l), o.complete()
					})))
				}
			}

			function Vx(t, n) {
				return Ve(gH(t, n, arguments.length >= 2, !0))
			}

			function xp(t) {
				return t <= 0 ? () => Fn : Ve((n, e) => {
					let r = [];
					n.subscribe(Oe(e, i => {
						r.push(i), t < r.length && r.shift()
					}, () => {
						for (const i of r) e.next(i);
						e.complete()
					}, void 0, () => {
						r = null
					}))
				})
			}

			function Bx(t, n) {
				const e = arguments.length >= 2;
				return r => r.pipe(t ? Gt((i, s) => t(i, s, r)) : br, xp(1), e ? xu(n) : Px(() => new Cu))
			}

			function Eu(t) {
				return Ve((n, e) => {
					try {
						n.subscribe(e)
					} finally {
						e.add(t)
					}
				})
			}
			const Y = "primary",
				qo = Symbol("RouteTitle");
			class _H {
				constructor(n) {
					this.params = n || {}
				}
				has(n) {
					return Object.prototype.hasOwnProperty.call(this.params, n)
				}
				get(n) {
					if (this.has(n)) {
						const e = this.params[n];
						return Array.isArray(e) ? e[0] : e
					}
					return null
				}
				getAll(n) {
					if (this.has(n)) {
						const e = this.params[n];
						return Array.isArray(e) ? e : [e]
					}
					return []
				}
				get keys() {
					return Object.keys(this.params)
				}
			}

			function vs(t) {
				return new _H(t)
			}

			function vH(t, n, e) {
				const r = e.path.split("/");
				if (r.length > t.length || "full" === e.pathMatch && (n.hasChildren() || r.length < t.length)) return null;
				const i = {};
				for (let s = 0; s < r.length; s++) {
					const o = r[s],
						a = t[s];
					if (o.startsWith(":")) i[o.substring(1)] = a;
					else if (o !== a.path) return null
				}
				return {
					consumed: t.slice(0, r.length),
					posParams: i
				}
			}

			function zn(t, n) {
				const e = t ? Object.keys(t) : void 0,
					r = n ? Object.keys(n) : void 0;
				if (!e || !r || e.length != r.length) return !1;
				let i;
				for (let s = 0; s < e.length; s++)
					if (i = e[s], !Hx(t[i], n[i])) return !1;
				return !0
			}

			function Hx(t, n) {
				if (Array.isArray(t) && Array.isArray(n)) {
					if (t.length !== n.length) return !1;
					const e = [...t].sort(),
						r = [...n].sort();
					return e.every((i, s) => r[s] === i)
				}
				return t === n
			}

			function jx(t) {
				return Array.prototype.concat.apply([], t)
			}

			function $x(t) {
				return t.length > 0 ? t[t.length - 1] : null
			}

			function st(t, n) {
				for (const e in t) t.hasOwnProperty(e) && n(t[e], e)
			}

			function Hr(t) {
				return pf(t) ? t : go(t) ? $e(Promise.resolve(t)) : O(t)
			}
			const CH = {
					exact: function zx(t, n, e) {
						if (!mi(t.segments, n.segments) || !Mu(t.segments, n.segments, e) || t.numberOfChildren !== n.numberOfChildren) return !1;
						for (const r in n.children)
							if (!t.children[r] || !zx(t.children[r], n.children[r], e)) return !1;
						return !0
					},
					subset: Wx
				},
				Ux = {
					exact: function DH(t, n) {
						return zn(t, n)
					},
					subset: function xH(t, n) {
						return Object.keys(n).length <= Object.keys(t).length && Object.keys(n).every(e => Hx(t[e], n[e]))
					},
					ignored: () => !0
				};

			function Gx(t, n, e) {
				return CH[e.paths](t.root, n.root, e.matrixParams) && Ux[e.queryParams](t.queryParams, n.queryParams) && !("exact" === e.fragment && t.fragment !== n.fragment)
			}

			function Wx(t, n, e) {
				return qx(t, n, n.segments, e)
			}

			function qx(t, n, e, r) {
				if (t.segments.length > e.length) {
					const i = t.segments.slice(0, e.length);
					return !(!mi(i, e) || n.hasChildren() || !Mu(i, e, r))
				}
				if (t.segments.length === e.length) {
					if (!mi(t.segments, e) || !Mu(t.segments, e, r)) return !1;
					for (const i in n.children)
						if (!t.children[i] || !Wx(t.children[i], n.children[i], r)) return !1;
					return !0
				} {
					const i = e.slice(0, t.segments.length),
						s = e.slice(t.segments.length);
					return !!(mi(t.segments, i) && Mu(t.segments, i, r) && t.children[Y]) && qx(t.children[Y], n, s, r)
				}
			}

			function Mu(t, n, e) {
				return n.every((r, i) => Ux[e](t[i].parameters, r.parameters))
			}
			class gi {
				constructor(n, e, r) {
					this.root = n, this.queryParams = e, this.fragment = r
				}
				get queryParamMap() {
					return this._queryParamMap || (this._queryParamMap = vs(this.queryParams)), this._queryParamMap
				}
				toString() {
					return AH.serialize(this)
				}
			}
			class X {
				constructor(n, e) {
					this.segments = n, this.children = e, this.parent = null, st(e, (r, i) => r.parent = this)
				}
				hasChildren() {
					return this.numberOfChildren > 0
				}
				get numberOfChildren() {
					return Object.keys(this.children).length
				}
				toString() {
					return Au(this)
				}
			}
			class Ko {
				constructor(n, e) {
					this.path = n, this.parameters = e
				}
				get parameterMap() {
					return this._parameterMap || (this._parameterMap = vs(this.parameters)), this._parameterMap
				}
				toString() {
					return Zx(this)
				}
			}

			function mi(t, n) {
				return t.length === n.length && t.every((e, r) => e.path === n[r].path)
			}
			let Kx = (() => {
				class t {}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275prov = E({
					token: t,
					factory: function() {
						return new Mp
					},
					providedIn: "root"
				}), t
			})();
			class Mp {
				parse(n) {
					const e = new LH(n);
					return new gi(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment())
				}
				serialize(n) {
					const e = `/${Qo(n.root,!0)}`,
						r = function TH(t) {
							const n = Object.keys(t).map(e => {
								const r = t[e];
								return Array.isArray(r) ? r.map(i => `${Su(e)}=${Su(i)}`).join("&") : `${Su(e)}=${Su(r)}`
							}).filter(e => !!e);
							return n.length ? `?${n.join("&")}` : ""
						}(n.queryParams);
					return `${e}${r}${"string"==typeof n.fragment?`#${function SH(t){return encodeURI(t)}(n.fragment)}`:""}`
				}
			}
			const AH = new Mp;

			function Au(t) {
				return t.segments.map(n => Zx(n)).join("/")
			}

			function Qo(t, n) {
				if (!t.hasChildren()) return Au(t);
				if (n) {
					const e = t.children[Y] ? Qo(t.children[Y], !1) : "",
						r = [];
					return st(t.children, (i, s) => {
						s !== Y && r.push(`${s}:${Qo(i,!1)}`)
					}), r.length > 0 ? `${e}(${r.join("//")})` : e
				} {
					const e = function MH(t, n) {
						let e = [];
						return st(t.children, (r, i) => {
							i === Y && (e = e.concat(n(r, i)))
						}), st(t.children, (r, i) => {
							i !== Y && (e = e.concat(n(r, i)))
						}), e
					}(t, (r, i) => i === Y ? [Qo(t.children[Y], !1)] : [`${i}:${Qo(r,!1)}`]);
					return 1 === Object.keys(t.children).length && null != t.children[Y] ? `${Au(t)}/${e[0]}` : `${Au(t)}/(${e.join("//")})`
				}
			}

			function Qx(t) {
				return encodeURIComponent(t).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
			}

			function Su(t) {
				return Qx(t).replace(/%3B/gi, ";")
			}

			function Ap(t) {
				return Qx(t).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
			}

			function Iu(t) {
				return decodeURIComponent(t)
			}

			function Yx(t) {
				return Iu(t.replace(/\+/g, "%20"))
			}

			function Zx(t) {
				return `${Ap(t.path)}${function IH(t){return Object.keys(t).map(n=>`;${Ap(n)}=${Ap(t[n])}`).join("")}(t.parameters)}`
			}
			const FH = /^[^\/()?;=#]+/;

			function Tu(t) {
				const n = t.match(FH);
				return n ? n[0] : ""
			}
			const RH = /^[^=?&#]+/,
				kH = /^[^&#]+/;
			class LH {
				constructor(n) {
					this.url = n, this.remaining = n
				}
				parseRootSegment() {
					return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new X([], {}) : new X([], this.parseChildren())
				}
				parseQueryParams() {
					const n = {};
					if (this.consumeOptional("?"))
						do {
							this.parseQueryParam(n)
						} while (this.consumeOptional("&"));
					return n
				}
				parseFragment() {
					return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
				}
				parseChildren() {
					if ("" === this.remaining) return {};
					this.consumeOptional("/");
					const n = [];
					for (this.peekStartsWith("(") || n.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), n.push(this.parseSegment());
					let e = {};
					this.peekStartsWith("/(") && (this.capture("/"), e = this.parseParens(!0));
					let r = {};
					return this.peekStartsWith("(") && (r = this.parseParens(!1)), (n.length > 0 || Object.keys(e).length > 0) && (r[Y] = new X(n, e)), r
				}
				parseSegment() {
					const n = Tu(this.remaining);
					if ("" === n && this.peekStartsWith(";")) throw new w(4009, !1);
					return this.capture(n), new Ko(Iu(n), this.parseMatrixParams())
				}
				parseMatrixParams() {
					const n = {};
					for (; this.consumeOptional(";");) this.parseParam(n);
					return n
				}
				parseParam(n) {
					const e = Tu(this.remaining);
					if (!e) return;
					this.capture(e);
					let r = "";
					if (this.consumeOptional("=")) {
						const i = Tu(this.remaining);
						i && (r = i, this.capture(r))
					}
					n[Iu(e)] = Iu(r)
				}
				parseQueryParam(n) {
					const e = function OH(t) {
						const n = t.match(RH);
						return n ? n[0] : ""
					}(this.remaining);
					if (!e) return;
					this.capture(e);
					let r = "";
					if (this.consumeOptional("=")) {
						const o = function NH(t) {
							const n = t.match(kH);
							return n ? n[0] : ""
						}(this.remaining);
						o && (r = o, this.capture(r))
					}
					const i = Yx(e),
						s = Yx(r);
					if (n.hasOwnProperty(i)) {
						let o = n[i];
						Array.isArray(o) || (o = [o], n[i] = o), o.push(s)
					} else n[i] = s
				}
				parseParens(n) {
					const e = {};
					for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
						const r = Tu(this.remaining),
							i = this.remaining[r.length];
						if ("/" !== i && ")" !== i && ";" !== i) throw new w(4010, !1);
						let s;
						r.indexOf(":") > -1 ? (s = r.slice(0, r.indexOf(":")), this.capture(s), this.capture(":")) : n && (s = Y);
						const o = this.parseChildren();
						e[s] = 1 === Object.keys(o).length ? o[Y] : new X([], o), this.consumeOptional("//")
					}
					return e
				}
				peekStartsWith(n) {
					return this.remaining.startsWith(n)
				}
				consumeOptional(n) {
					return !!this.peekStartsWith(n) && (this.remaining = this.remaining.substring(n.length), !0)
				}
				capture(n) {
					if (!this.consumeOptional(n)) throw new w(4011, !1)
				}
			}

			function Sp(t) {
				return t.segments.length > 0 ? new X([], {
					[Y]: t
				}) : t
			}

			function Fu(t) {
				const n = {};
				for (const r of Object.keys(t.children)) {
					const s = Fu(t.children[r]);
					(s.segments.length > 0 || s.hasChildren()) && (n[r] = s)
				}
				return function PH(t) {
					if (1 === t.numberOfChildren && t.children[Y]) {
						const n = t.children[Y];
						return new X(t.segments.concat(n.segments), n.children)
					}
					return t
				}(new X(t.segments, n))
			}

			function yi(t) {
				return t instanceof gi
			}

			function HH(t, n, e, r, i) {
				if (0 === e.length) return bs(n.root, n.root, n.root, r, i);
				const s = function eE(t) {
					if ("string" == typeof t[0] && 1 === t.length && "/" === t[0]) return new Jx(!0, 0, t);
					let n = 0,
						e = !1;
					const r = t.reduce((i, s, o) => {
						if ("object" == typeof s && null != s) {
							if (s.outlets) {
								const a = {};
								return st(s.outlets, (l, u) => {
									a[u] = "string" == typeof l ? l.split("/") : l
								}), [...i, {
									outlets: a
								}]
							}
							if (s.segmentPath) return [...i, s.segmentPath]
						}
						return "string" != typeof s ? [...i, s] : 0 === o ? (s.split("/").forEach((a, l) => {
							0 == l && "." === a || (0 == l && "" === a ? e = !0 : ".." === a ? n++ : "" != a && i.push(a))
						}), i) : [...i, s]
					}, []);
					return new Jx(e, n, r)
				}(e);
				return s.toRoot() ? bs(n.root, n.root, new X([], {}), r, i) : function o(l) {
					const u = function $H(t, n, e, r) {
							if (t.isAbsolute) return new ws(n.root, !0, 0);
							if (-1 === r) return new ws(e, e === n.root, 0);
							return function tE(t, n, e) {
								let r = t,
									i = n,
									s = e;
								for (; s > i;) {
									if (s -= i, r = r.parent, !r) throw new w(4005, !1);
									i = r.segments.length
								}
								return new ws(r, !1, i - s)
							}(e, r + (Yo(t.commands[0]) ? 0 : 1), t.numberOfDoubleDots)
						}(s, n, t.snapshot?._urlSegment, l),
						c = u.processChildren ? Xo(u.segmentGroup, u.index, s.commands) : Tp(u.segmentGroup, u.index, s.commands);
					return bs(n.root, u.segmentGroup, c, r, i)
				}(t.snapshot?._lastPathIndex)
			}

			function Yo(t) {
				return "object" == typeof t && null != t && !t.outlets && !t.segmentPath
			}

			function Zo(t) {
				return "object" == typeof t && null != t && t.outlets
			}

			function bs(t, n, e, r, i) {
				let o, s = {};
				r && st(r, (l, u) => {
					s[u] = Array.isArray(l) ? l.map(c => `${c}`) : `${l}`
				}), o = t === n ? e : Xx(t, n, e);
				const a = Sp(Fu(o));
				return new gi(a, s, i)
			}

			function Xx(t, n, e) {
				const r = {};
				return st(t.children, (i, s) => {
					r[s] = i === n ? e : Xx(i, n, e)
				}), new X(t.segments, r)
			}
			class Jx {
				constructor(n, e, r) {
					if (this.isAbsolute = n, this.numberOfDoubleDots = e, this.commands = r, n && r.length > 0 && Yo(r[0])) throw new w(4003, !1);
					const i = r.find(Zo);
					if (i && i !== $x(r)) throw new w(4004, !1)
				}
				toRoot() {
					return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
				}
			}
			class ws {
				constructor(n, e, r) {
					this.segmentGroup = n, this.processChildren = e, this.index = r
				}
			}

			function Tp(t, n, e) {
				if (t || (t = new X([], {})), 0 === t.segments.length && t.hasChildren()) return Xo(t, n, e);
				const r = function GH(t, n, e) {
						let r = 0,
							i = n;
						const s = {
							match: !1,
							pathIndex: 0,
							commandIndex: 0
						};
						for (; i < t.segments.length;) {
							if (r >= e.length) return s;
							const o = t.segments[i],
								a = e[r];
							if (Zo(a)) break;
							const l = `${a}`,
								u = r < e.length - 1 ? e[r + 1] : null;
							if (i > 0 && void 0 === l) break;
							if (l && u && "object" == typeof u && void 0 === u.outlets) {
								if (!rE(l, u, o)) return s;
								r += 2
							} else {
								if (!rE(l, {}, o)) return s;
								r++
							}
							i++
						}
						return {
							match: !0,
							pathIndex: i,
							commandIndex: r
						}
					}(t, n, e),
					i = e.slice(r.commandIndex);
				if (r.match && r.pathIndex < t.segments.length) {
					const s = new X(t.segments.slice(0, r.pathIndex), {});
					return s.children[Y] = new X(t.segments.slice(r.pathIndex), t.children), Xo(s, 0, i)
				}
				return r.match && 0 === i.length ? new X(t.segments, {}) : r.match && !t.hasChildren() ? Fp(t, n, e) : r.match ? Xo(t, 0, i) : Fp(t, n, e)
			}

			function Xo(t, n, e) {
				if (0 === e.length) return new X(t.segments, {}); {
					const r = function UH(t) {
							return Zo(t[0]) ? t[0].outlets : {
								[Y]: t
							}
						}(e),
						i = {};
					return st(r, (s, o) => {
						"string" == typeof s && (s = [s]), null !== s && (i[o] = Tp(t.children[o], n, s))
					}), st(t.children, (s, o) => {
						void 0 === r[o] && (i[o] = s)
					}), new X(t.segments, i)
				}
			}

			function Fp(t, n, e) {
				const r = t.segments.slice(0, n);
				let i = 0;
				for (; i < e.length;) {
					const s = e[i];
					if (Zo(s)) {
						const l = zH(s.outlets);
						return new X(r, l)
					}
					if (0 === i && Yo(e[0])) {
						r.push(new Ko(t.segments[n].path, nE(e[0]))), i++;
						continue
					}
					const o = Zo(s) ? s.outlets[Y] : `${s}`,
						a = i < e.length - 1 ? e[i + 1] : null;
					o && a && Yo(a) ? (r.push(new Ko(o, nE(a))), i += 2) : (r.push(new Ko(o, {})), i++)
				}
				return new X(r, {})
			}

			function zH(t) {
				const n = {};
				return st(t, (e, r) => {
					"string" == typeof e && (e = [e]), null !== e && (n[r] = Fp(new X([], {}), 0, e))
				}), n
			}

			function nE(t) {
				const n = {};
				return st(t, (e, r) => n[r] = `${e}`), n
			}

			function rE(t, n, e) {
				return t == e.path && zn(n, e.parameters)
			}
			class pr {
				constructor(n, e) {
					this.id = n, this.url = e
				}
			}
			class Rp extends pr {
				constructor(n, e, r = "imperative", i = null) {
					super(n, e), this.type = 0, this.navigationTrigger = r, this.restoredState = i
				}
				toString() {
					return `NavigationStart(id: ${this.id}, url: '${this.url}')`
				}
			}
			class _i extends pr {
				constructor(n, e, r) {
					super(n, e), this.urlAfterRedirects = r, this.type = 1
				}
				toString() {
					return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
				}
			}
			class Ru extends pr {
				constructor(n, e, r, i) {
					super(n, e), this.reason = r, this.code = i, this.type = 2
				}
				toString() {
					return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
				}
			}
			class iE extends pr {
				constructor(n, e, r, i) {
					super(n, e), this.error = r, this.target = i, this.type = 3
				}
				toString() {
					return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
				}
			}
			class WH extends pr {
				constructor(n, e, r, i) {
					super(n, e), this.urlAfterRedirects = r, this.state = i, this.type = 4
				}
				toString() {
					return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
				}
			}
			class qH extends pr {
				constructor(n, e, r, i) {
					super(n, e), this.urlAfterRedirects = r, this.state = i, this.type = 7
				}
				toString() {
					return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
				}
			}
			class KH extends pr {
				constructor(n, e, r, i, s) {
					super(n, e), this.urlAfterRedirects = r, this.state = i, this.shouldActivate = s, this.type = 8
				}
				toString() {
					return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
				}
			}
			class QH extends pr {
				constructor(n, e, r, i) {
					super(n, e), this.urlAfterRedirects = r, this.state = i, this.type = 5
				}
				toString() {
					return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
				}
			}
			class YH extends pr {
				constructor(n, e, r, i) {
					super(n, e), this.urlAfterRedirects = r, this.state = i, this.type = 6
				}
				toString() {
					return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
				}
			}
			class ZH {
				constructor(n) {
					this.route = n, this.type = 9
				}
				toString() {
					return `RouteConfigLoadStart(path: ${this.route.path})`
				}
			}
			class XH {
				constructor(n) {
					this.route = n, this.type = 10
				}
				toString() {
					return `RouteConfigLoadEnd(path: ${this.route.path})`
				}
			}
			class JH {
				constructor(n) {
					this.snapshot = n, this.type = 11
				}
				toString() {
					return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
				}
			}
			class ej {
				constructor(n) {
					this.snapshot = n, this.type = 12
				}
				toString() {
					return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
				}
			}
			class tj {
				constructor(n) {
					this.snapshot = n, this.type = 13
				}
				toString() {
					return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
				}
			}
			class nj {
				constructor(n) {
					this.snapshot = n, this.type = 14
				}
				toString() {
					return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
				}
			}
			class sE {
				constructor(n, e, r) {
					this.routerEvent = n, this.position = e, this.anchor = r, this.type = 15
				}
				toString() {
					return `Scroll(anchor: '${this.anchor}', position: '${this.position?`${this.position[0]}, ${this.position[1]}`:null}')`
				}
			}
			class oE {
				constructor(n) {
					this._root = n
				}
				get root() {
					return this._root.value
				}
				parent(n) {
					const e = this.pathFromRoot(n);
					return e.length > 1 ? e[e.length - 2] : null
				}
				children(n) {
					const e = Op(n, this._root);
					return e ? e.children.map(r => r.value) : []
				}
				firstChild(n) {
					const e = Op(n, this._root);
					return e && e.children.length > 0 ? e.children[0].value : null
				}
				siblings(n) {
					const e = kp(n, this._root);
					return e.length < 2 ? [] : e[e.length - 2].children.map(i => i.value).filter(i => i !== n)
				}
				pathFromRoot(n) {
					return kp(n, this._root).map(e => e.value)
				}
			}

			function Op(t, n) {
				if (t === n.value) return n;
				for (const e of n.children) {
					const r = Op(t, e);
					if (r) return r
				}
				return null
			}

			function kp(t, n) {
				if (t === n.value) return [n];
				for (const e of n.children) {
					const r = kp(t, e);
					if (r.length) return r.unshift(n), r
				}
				return []
			}
			class gr {
				constructor(n, e) {
					this.value = n, this.children = e
				}
				toString() {
					return `TreeNode(${this.value})`
				}
			}

			function Cs(t) {
				const n = {};
				return t && t.children.forEach(e => n[e.value.outlet] = e), n
			}
			class aE extends oE {
				constructor(n, e) {
					super(n), this.snapshot = e, Np(this, n)
				}
				toString() {
					return this.snapshot.toString()
				}
			}

			function lE(t, n) {
				const e = function ij(t, n) {
						const o = new Ou([], {}, {}, "", {}, Y, n, null, t.root, -1, {});
						return new cE("", new gr(o, []))
					}(t, n),
					r = new qt([new Ko("", {})]),
					i = new qt({}),
					s = new qt({}),
					o = new qt({}),
					a = new qt(""),
					l = new vi(r, i, o, a, s, Y, n, e.root);
				return l.snapshot = e.root, new aE(new gr(l, []), e)
			}
			class vi {
				constructor(n, e, r, i, s, o, a, l) {
					this.url = n, this.params = e, this.queryParams = r, this.fragment = i, this.data = s, this.outlet = o, this.component = a, this.title = this.data?.pipe(j(u => u[qo])) ?? O(void 0), this._futureSnapshot = l
				}
				get routeConfig() {
					return this._futureSnapshot.routeConfig
				}
				get root() {
					return this._routerState.root
				}
				get parent() {
					return this._routerState.parent(this)
				}
				get firstChild() {
					return this._routerState.firstChild(this)
				}
				get children() {
					return this._routerState.children(this)
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this)
				}
				get paramMap() {
					return this._paramMap || (this._paramMap = this.params.pipe(j(n => vs(n)))), this._paramMap
				}
				get queryParamMap() {
					return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(j(n => vs(n)))), this._queryParamMap
				}
				toString() {
					return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
				}
			}

			function uE(t, n = "emptyOnly") {
				const e = t.pathFromRoot;
				let r = 0;
				if ("always" !== n)
					for (r = e.length - 1; r >= 1;) {
						const i = e[r],
							s = e[r - 1];
						if (i.routeConfig && "" === i.routeConfig.path) r--;
						else {
							if (s.component) break;
							r--
						}
					}
				return function sj(t) {
					return t.reduce((n, e) => ({
						params: {
							...n.params,
							...e.params
						},
						data: {
							...n.data,
							...e.data
						},
						resolve: {
							...e.data,
							...n.resolve,
							...e.routeConfig?.data,
							...e._resolvedData
						}
					}), {
						params: {},
						data: {},
						resolve: {}
					})
				}(e.slice(r))
			}
			class Ou {
				constructor(n, e, r, i, s, o, a, l, u, c, d, f) {
					this.url = n, this.params = e, this.queryParams = r, this.fragment = i, this.data = s, this.outlet = o, this.component = a, this.title = this.data?.[qo], this.routeConfig = l, this._urlSegment = u, this._lastPathIndex = c, this._correctedLastPathIndex = f ?? c, this._resolve = d
				}
				get root() {
					return this._routerState.root
				}
				get parent() {
					return this._routerState.parent(this)
				}
				get firstChild() {
					return this._routerState.firstChild(this)
				}
				get children() {
					return this._routerState.children(this)
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this)
				}
				get paramMap() {
					return this._paramMap || (this._paramMap = vs(this.params)), this._paramMap
				}
				get queryParamMap() {
					return this._queryParamMap || (this._queryParamMap = vs(this.queryParams)), this._queryParamMap
				}
				toString() {
					return `Route(url:'${this.url.map(r=>r.toString()).join("/")}', path:'${this.routeConfig?this.routeConfig.path:""}')`
				}
			}
			class cE extends oE {
				constructor(n, e) {
					super(e), this.url = n, Np(this, e)
				}
				toString() {
					return dE(this._root)
				}
			}

			function Np(t, n) {
				n.value._routerState = t, n.children.forEach(e => Np(t, e))
			}

			function dE(t) {
				const n = t.children.length > 0 ? ` { ${t.children.map(dE).join(", ")} } ` : "";
				return `${t.value}${n}`
			}

			function Lp(t) {
				if (t.snapshot) {
					const n = t.snapshot,
						e = t._futureSnapshot;
					t.snapshot = e, zn(n.queryParams, e.queryParams) || t.queryParams.next(e.queryParams), n.fragment !== e.fragment && t.fragment.next(e.fragment), zn(n.params, e.params) || t.params.next(e.params),
						function bH(t, n) {
							if (t.length !== n.length) return !1;
							for (let e = 0; e < t.length; ++e)
								if (!zn(t[e], n[e])) return !1;
							return !0
						}(n.url, e.url) || t.url.next(e.url), zn(n.data, e.data) || t.data.next(e.data)
				} else t.snapshot = t._futureSnapshot, t.data.next(t._futureSnapshot.data)
			}

			function Pp(t, n) {
				const e = zn(t.params, n.params) && function EH(t, n) {
					return mi(t, n) && t.every((e, r) => zn(e.parameters, n[r].parameters))
				}(t.url, n.url);
				return e && !(!t.parent != !n.parent) && (!t.parent || Pp(t.parent, n.parent))
			}

			function Jo(t, n, e) {
				if (e && t.shouldReuseRoute(n.value, e.value.snapshot)) {
					const r = e.value;
					r._futureSnapshot = n.value;
					const i = function aj(t, n, e) {
						return n.children.map(r => {
							for (const i of e.children)
								if (t.shouldReuseRoute(r.value, i.value.snapshot)) return Jo(t, r, i);
							return Jo(t, r)
						})
					}(t, n, e);
					return new gr(r, i)
				} {
					if (t.shouldAttach(n.value)) {
						const s = t.retrieve(n.value);
						if (null !== s) {
							const o = s.route;
							return o.value._futureSnapshot = n.value, o.children = n.children.map(a => Jo(t, a)), o
						}
					}
					const r = function lj(t) {
							return new vi(new qt(t.url), new qt(t.params), new qt(t.queryParams), new qt(t.fragment), new qt(t.data), t.outlet, t.component, t)
						}(n.value),
						i = n.children.map(s => Jo(t, s));
					return new gr(r, i)
				}
			}
			const Vp = "ngNavigationCancelingError";

			function fE(t, n) {
				const {
					redirectTo: e,
					navigationBehaviorOptions: r
				} = yi(n) ? {
					redirectTo: n,
					navigationBehaviorOptions: void 0
				} : n, i = hE(!1, 0, n);
				return i.url = e, i.navigationBehaviorOptions = r, i
			}

			function hE(t, n, e) {
				const r = new Error("NavigationCancelingError: " + (t || ""));
				return r[Vp] = !0, r.cancellationCode = n, e && (r.url = e), r
			}

			function pE(t) {
				return gE(t) && yi(t.url)
			}

			function gE(t) {
				return t && t[Vp]
			}
			class uj {
				constructor() {
					this.outlet = null, this.route = null, this.resolver = null, this.injector = null, this.children = new ea, this.attachRef = null
				}
			}
			let ea = (() => {
				class t {
					constructor() {
						this.contexts = new Map
					}
					onChildOutletCreated(e, r) {
						const i = this.getOrCreateContext(e);
						i.outlet = r, this.contexts.set(e, i)
					}
					onChildOutletDestroyed(e) {
						const r = this.getContext(e);
						r && (r.outlet = null, r.attachRef = null)
					}
					onOutletDeactivated() {
						const e = this.contexts;
						return this.contexts = new Map, e
					}
					onOutletReAttached(e) {
						this.contexts = e
					}
					getOrCreateContext(e) {
						let r = this.getContext(e);
						return r || (r = new uj, this.contexts.set(e, r)), r
					}
					getContext(e) {
						return this.contexts.get(e) || null
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const ku = !1;
			let Bp = (() => {
				class t {
					constructor(e, r, i, s, o) {
						this.parentContexts = e, this.location = r, this.changeDetector = s, this.environmentInjector = o, this.activated = null, this._activatedRoute = null, this.activateEvents = new Me, this.deactivateEvents = new Me, this.attachEvents = new Me, this.detachEvents = new Me, this.name = i || Y, e.onChildOutletCreated(this.name, this)
					}
					ngOnDestroy() {
						this.parentContexts.getContext(this.name)?.outlet === this && this.parentContexts.onChildOutletDestroyed(this.name)
					}
					ngOnInit() {
						if (!this.activated) {
							const e = this.parentContexts.getContext(this.name);
							e && e.route && (e.attachRef ? this.attach(e.attachRef, e.route) : this.activateWith(e.route, e.injector))
						}
					}
					get isActivated() {
						return !!this.activated
					}
					get component() {
						if (!this.activated) throw new w(4012, ku);
						return this.activated.instance
					}
					get activatedRoute() {
						if (!this.activated) throw new w(4012, ku);
						return this._activatedRoute
					}
					get activatedRouteData() {
						return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
					}
					detach() {
						if (!this.activated) throw new w(4012, ku);
						this.location.detach();
						const e = this.activated;
						return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(e.instance), e
					}
					attach(e, r) {
						this.activated = e, this._activatedRoute = r, this.location.insert(e.hostView), this.attachEvents.emit(e.instance)
					}
					deactivate() {
						if (this.activated) {
							const e = this.component;
							this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(e)
						}
					}
					activateWith(e, r) {
						if (this.isActivated) throw new w(4013, ku);
						this._activatedRoute = e;
						const i = this.location,
							o = e._futureSnapshot.component,
							a = this.parentContexts.getOrCreateContext(this.name).children,
							l = new cj(e, a, i.injector);
						if (r && function dj(t) {
								return !!t.resolveComponentFactory
							}(r)) {
							const u = r.resolveComponentFactory(o);
							this.activated = i.createComponent(u, i.length, l)
						} else this.activated = i.createComponent(o, {
							index: i.length,
							injector: l,
							environmentInjector: r ?? this.environmentInjector
						});
						this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance)
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(p(ea), p(xn), Li("name"), p(Ao), p(Mr))
				}, t.\u0275dir = x({
					type: t,
					selectors: [
						["router-outlet"]
					],
					outputs: {
						activateEvents: "activate",
						deactivateEvents: "deactivate",
						attachEvents: "attach",
						detachEvents: "detach"
					},
					exportAs: ["outlet"],
					standalone: !0
				}), t
			})();
			class cj {
				constructor(n, e, r) {
					this.route = n, this.childContexts = e, this.parent = r
				}
				get(n, e) {
					return n === vi ? this.route : n === ea ? this.childContexts : this.parent.get(n, e)
				}
			}
			let Hp = (() => {
				class t {}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275cmp = en({
					type: t,
					selectors: [
						["ng-component"]
					],
					standalone: !0,
					features: [mb],
					decls: 1,
					vars: 0,
					template: function(e, r) {
						1 & e && bt(0, "router-outlet")
					},
					dependencies: [Bp],
					encapsulation: 2
				}), t
			})();

			function mE(t, n) {
				return t.providers && !t._injector && (t._injector = vl(t.providers, n, `Route: ${t.path}`)), t._injector ?? n
			}

			function $p(t) {
				const n = t.children && t.children.map($p),
					e = n ? {
						...t,
						children: n
					} : {
						...t
					};
				return !e.component && !e.loadComponent && (n || e.loadChildren) && e.outlet && e.outlet !== Y && (e.component = Hp), e
			}

			function fn(t) {
				return t.outlet || Y
			}

			function yE(t, n) {
				const e = t.filter(r => fn(r) === n);
				return e.push(...t.filter(r => fn(r) !== n)), e
			}

			function ta(t) {
				if (!t) return null;
				if (t.routeConfig?._injector) return t.routeConfig._injector;
				for (let n = t.parent; n; n = n.parent) {
					const e = n.routeConfig;
					if (e?._loadedInjector) return e._loadedInjector;
					if (e?._injector) return e._injector
				}
				return null
			}
			class mj {
				constructor(n, e, r, i) {
					this.routeReuseStrategy = n, this.futureState = e, this.currState = r, this.forwardEvent = i
				}
				activate(n) {
					const e = this.futureState._root,
						r = this.currState ? this.currState._root : null;
					this.deactivateChildRoutes(e, r, n), Lp(this.futureState.root), this.activateChildRoutes(e, r, n)
				}
				deactivateChildRoutes(n, e, r) {
					const i = Cs(e);
					n.children.forEach(s => {
						const o = s.value.outlet;
						this.deactivateRoutes(s, i[o], r), delete i[o]
					}), st(i, (s, o) => {
						this.deactivateRouteAndItsChildren(s, r)
					})
				}
				deactivateRoutes(n, e, r) {
					const i = n.value,
						s = e ? e.value : null;
					if (i === s)
						if (i.component) {
							const o = r.getContext(i.outlet);
							o && this.deactivateChildRoutes(n, e, o.children)
						} else this.deactivateChildRoutes(n, e, r);
					else s && this.deactivateRouteAndItsChildren(e, r)
				}
				deactivateRouteAndItsChildren(n, e) {
					n.value.component && this.routeReuseStrategy.shouldDetach(n.value.snapshot) ? this.detachAndStoreRouteSubtree(n, e) : this.deactivateRouteAndOutlet(n, e)
				}
				detachAndStoreRouteSubtree(n, e) {
					const r = e.getContext(n.value.outlet),
						i = r && n.value.component ? r.children : e,
						s = Cs(n);
					for (const o of Object.keys(s)) this.deactivateRouteAndItsChildren(s[o], i);
					if (r && r.outlet) {
						const o = r.outlet.detach(),
							a = r.children.onOutletDeactivated();
						this.routeReuseStrategy.store(n.value.snapshot, {
							componentRef: o,
							route: n,
							contexts: a
						})
					}
				}
				deactivateRouteAndOutlet(n, e) {
					const r = e.getContext(n.value.outlet),
						i = r && n.value.component ? r.children : e,
						s = Cs(n);
					for (const o of Object.keys(s)) this.deactivateRouteAndItsChildren(s[o], i);
					r && r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated(), r.attachRef = null, r.resolver = null, r.route = null)
				}
				activateChildRoutes(n, e, r) {
					const i = Cs(e);
					n.children.forEach(s => {
						this.activateRoutes(s, i[s.value.outlet], r), this.forwardEvent(new nj(s.value.snapshot))
					}), n.children.length && this.forwardEvent(new ej(n.value.snapshot))
				}
				activateRoutes(n, e, r) {
					const i = n.value,
						s = e ? e.value : null;
					if (Lp(i), i === s)
						if (i.component) {
							const o = r.getOrCreateContext(i.outlet);
							this.activateChildRoutes(n, e, o.children)
						} else this.activateChildRoutes(n, e, r);
					else if (i.component) {
						const o = r.getOrCreateContext(i.outlet);
						if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
							const a = this.routeReuseStrategy.retrieve(i.snapshot);
							this.routeReuseStrategy.store(i.snapshot, null), o.children.onOutletReAttached(a.contexts), o.attachRef = a.componentRef, o.route = a.route.value, o.outlet && o.outlet.attach(a.componentRef, a.route.value), Lp(a.route.value), this.activateChildRoutes(n, null, o.children)
						} else {
							const a = ta(i.snapshot),
								l = a?.get(ro) ?? null;
							o.attachRef = null, o.route = i, o.resolver = l, o.injector = a, o.outlet && o.outlet.activateWith(i, o.injector), this.activateChildRoutes(n, null, o.children)
						}
					} else this.activateChildRoutes(n, null, r)
				}
			}
			class _E {
				constructor(n) {
					this.path = n, this.route = this.path[this.path.length - 1]
				}
			}
			class Nu {
				constructor(n, e) {
					this.component = n, this.route = e
				}
			}

			function yj(t, n, e) {
				const r = t._root;
				return na(r, n ? n._root : null, e, [r.value])
			}

			function Ds(t, n) {
				const e = Symbol(),
					r = n.get(t, e);
				return r === e ? "function" != typeof t || function e0(t) {
					return null !== wa(t)
				}(t) ? n.get(t) : t : r
			}

			function na(t, n, e, r, i = {
				canDeactivateChecks: [],
				canActivateChecks: []
			}) {
				const s = Cs(n);
				return t.children.forEach(o => {
					(function vj(t, n, e, r, i = {
						canDeactivateChecks: [],
						canActivateChecks: []
					}) {
						const s = t.value,
							o = n ? n.value : null,
							a = e ? e.getContext(t.value.outlet) : null;
						if (o && s.routeConfig === o.routeConfig) {
							const l = function bj(t, n, e) {
								if ("function" == typeof e) return e(t, n);
								switch (e) {
									case "pathParamsChange":
										return !mi(t.url, n.url);
									case "pathParamsOrQueryParamsChange":
										return !mi(t.url, n.url) || !zn(t.queryParams, n.queryParams);
									case "always":
										return !0;
									case "paramsOrQueryParamsChange":
										return !Pp(t, n) || !zn(t.queryParams, n.queryParams);
									default:
										return !Pp(t, n)
								}
							}(o, s, s.routeConfig.runGuardsAndResolvers);
							l ? i.canActivateChecks.push(new _E(r)) : (s.data = o.data, s._resolvedData = o._resolvedData), na(t, n, s.component ? a ? a.children : null : e, r, i), l && a && a.outlet && a.outlet.isActivated && i.canDeactivateChecks.push(new Nu(a.outlet.component, o))
						} else o && ra(n, a, i), i.canActivateChecks.push(new _E(r)), na(t, null, s.component ? a ? a.children : null : e, r, i)
					})(o, s[o.value.outlet], e, r.concat([o.value]), i), delete s[o.value.outlet]
				}), st(s, (o, a) => ra(o, e.getContext(a), i)), i
			}

			function ra(t, n, e) {
				const r = Cs(t),
					i = t.value;
				st(r, (s, o) => {
					ra(s, i.component ? n ? n.children.getContext(o) : null : n, e)
				}), e.canDeactivateChecks.push(new Nu(i.component && n && n.outlet && n.outlet.isActivated ? n.outlet.component : null, i))
			}

			function ia(t) {
				return "function" == typeof t
			}

			function Up(t) {
				return t instanceof Cu || "EmptyError" === t?.name
			}
			const Lu = Symbol("INITIAL_VALUE");

			function xs() {
				return Gn(t => Cp(t.map(n => n.pipe(Vr(1), Wo(Lu)))).pipe(j(n => {
					for (const e of n)
						if (!0 !== e) {
							if (e === Lu) return Lu;
							if (!1 === e || e instanceof gi) return e
						} return !0
				}), Gt(n => n !== Lu), Vr(1)))
			}

			function vE(t) {
				return function wA(...t) {
					return Mg(t)
				}(je(n => {
					if (yi(n)) throw fE(0, n)
				}), j(n => !0 === n))
			}
			const Gp = {
				matched: !1,
				consumedSegments: [],
				remainingSegments: [],
				parameters: {},
				positionalParamSegments: {}
			};

			function bE(t, n, e, r, i) {
				const s = zp(t, n, e);
				return s.matched ? function Pj(t, n, e, r) {
					const i = n.canMatch;
					return i && 0 !== i.length ? O(i.map(o => {
						const a = Ds(o, t);
						return Hr(function Mj(t) {
							return t && ia(t.canMatch)
						}(a) ? a.canMatch(n, e) : t.runInContext(() => a(n, e)))
					})).pipe(xs(), vE()) : O(!0)
				}(r = mE(n, r), n, e).pipe(j(o => !0 === o ? s : {
					...Gp
				})) : O(s)
			}

			function zp(t, n, e) {
				if ("" === n.path) return "full" === n.pathMatch && (t.hasChildren() || e.length > 0) ? {
					...Gp
				} : {
					matched: !0,
					consumedSegments: [],
					remainingSegments: e,
					parameters: {},
					positionalParamSegments: {}
				};
				const i = (n.matcher || vH)(e, t, n);
				if (!i) return {
					...Gp
				};
				const s = {};
				st(i.posParams, (a, l) => {
					s[l] = a.path
				});
				const o = i.consumed.length > 0 ? {
					...s,
					...i.consumed[i.consumed.length - 1].parameters
				} : s;
				return {
					matched: !0,
					consumedSegments: i.consumed,
					remainingSegments: e.slice(i.consumed.length),
					parameters: o,
					positionalParamSegments: i.posParams ?? {}
				}
			}

			function Pu(t, n, e, r, i = "corrected") {
				if (e.length > 0 && function Hj(t, n, e) {
						return e.some(r => Vu(t, n, r) && fn(r) !== Y)
					}(t, e, r)) {
					const o = new X(n, function Bj(t, n, e, r) {
						const i = {};
						i[Y] = r, r._sourceSegment = t, r._segmentIndexShift = n.length;
						for (const s of e)
							if ("" === s.path && fn(s) !== Y) {
								const o = new X([], {});
								o._sourceSegment = t, o._segmentIndexShift = n.length, i[fn(s)] = o
							} return i
					}(t, n, r, new X(e, t.children)));
					return o._sourceSegment = t, o._segmentIndexShift = n.length, {
						segmentGroup: o,
						slicedSegments: []
					}
				}
				if (0 === e.length && function jj(t, n, e) {
						return e.some(r => Vu(t, n, r))
					}(t, e, r)) {
					const o = new X(t.segments, function Vj(t, n, e, r, i, s) {
						const o = {};
						for (const a of r)
							if (Vu(t, e, a) && !i[fn(a)]) {
								const l = new X([], {});
								l._sourceSegment = t, l._segmentIndexShift = "legacy" === s ? t.segments.length : n.length, o[fn(a)] = l
							} return {
							...i,
							...o
						}
					}(t, n, e, r, t.children, i));
					return o._sourceSegment = t, o._segmentIndexShift = n.length, {
						segmentGroup: o,
						slicedSegments: e
					}
				}
				const s = new X(t.segments, t.children);
				return s._sourceSegment = t, s._segmentIndexShift = n.length, {
					segmentGroup: s,
					slicedSegments: e
				}
			}

			function Vu(t, n, e) {
				return (!(t.hasChildren() || n.length > 0) || "full" !== e.pathMatch) && "" === e.path
			}

			function wE(t, n, e, r) {
				return !!(fn(t) === r || r !== Y && Vu(n, e, t)) && ("**" === t.path || zp(n, t, e).matched)
			}

			function CE(t, n, e) {
				return 0 === n.length && !t.children[e]
			}
			const Bu = !1;
			class Hu {
				constructor(n) {
					this.segmentGroup = n || null
				}
			}
			class DE {
				constructor(n) {
					this.urlTree = n
				}
			}

			function sa(t) {
				return _s(new Hu(t))
			}

			function xE(t) {
				return _s(new DE(t))
			}
			class zj {
				constructor(n, e, r, i, s) {
					this.injector = n, this.configLoader = e, this.urlSerializer = r, this.urlTree = i, this.config = s, this.allowRedirects = !0
				}
				apply() {
					const n = Pu(this.urlTree.root, [], [], this.config).segmentGroup,
						e = new X(n.segments, n.children);
					return this.expandSegmentGroup(this.injector, this.config, e, Y).pipe(j(s => this.createUrlTree(Fu(s), this.urlTree.queryParams, this.urlTree.fragment))).pipe(hr(s => {
						if (s instanceof DE) return this.allowRedirects = !1, this.match(s.urlTree);
						throw s instanceof Hu ? this.noMatchError(s) : s
					}))
				}
				match(n) {
					return this.expandSegmentGroup(this.injector, this.config, n.root, Y).pipe(j(i => this.createUrlTree(Fu(i), n.queryParams, n.fragment))).pipe(hr(i => {
						throw i instanceof Hu ? this.noMatchError(i) : i
					}))
				}
				noMatchError(n) {
					return new w(4002, Bu)
				}
				createUrlTree(n, e, r) {
					const i = Sp(n);
					return new gi(i, e, r)
				}
				expandSegmentGroup(n, e, r, i) {
					return 0 === r.segments.length && r.hasChildren() ? this.expandChildren(n, e, r).pipe(j(s => new X([], s))) : this.expandSegment(n, r, e, r.segments, i, !0)
				}
				expandChildren(n, e, r) {
					const i = [];
					for (const s of Object.keys(r.children)) "primary" === s ? i.unshift(s) : i.push(s);
					return $e(i).pipe(kr(s => {
						const o = r.children[s],
							a = yE(e, s);
						return this.expandSegmentGroup(n, a, o, s).pipe(j(l => ({
							segment: l,
							outlet: s
						})))
					}), Vx((s, o) => (s[o.outlet] = o.segment, s), {}), Bx())
				}
				expandSegment(n, e, r, i, s, o) {
					return $e(r).pipe(kr(a => this.expandSegmentAgainstRoute(n, e, r, a, i, s, o).pipe(hr(u => {
						if (u instanceof Hu) return O(null);
						throw u
					}))), Br(a => !!a), hr((a, l) => {
						if (Up(a)) return CE(e, i, s) ? O(new X([], {})) : sa(e);
						throw a
					}))
				}
				expandSegmentAgainstRoute(n, e, r, i, s, o, a) {
					return wE(i, e, s, o) ? void 0 === i.redirectTo ? this.matchSegmentAgainstRoute(n, e, i, s, o) : a && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(n, e, r, i, s, o) : sa(e) : sa(e)
				}
				expandSegmentAgainstRouteUsingRedirect(n, e, r, i, s, o) {
					return "**" === i.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(n, r, i, o) : this.expandRegularSegmentAgainstRouteUsingRedirect(n, e, r, i, s, o)
				}
				expandWildCardWithParamsAgainstRouteUsingRedirect(n, e, r, i) {
					const s = this.applyRedirectCommands([], r.redirectTo, {});
					return r.redirectTo.startsWith("/") ? xE(s) : this.lineralizeSegments(r, s).pipe(nt(o => {
						const a = new X(o, {});
						return this.expandSegment(n, a, e, o, i, !1)
					}))
				}
				expandRegularSegmentAgainstRouteUsingRedirect(n, e, r, i, s, o) {
					const {
						matched: a,
						consumedSegments: l,
						remainingSegments: u,
						positionalParamSegments: c
					} = zp(e, i, s);
					if (!a) return sa(e);
					const d = this.applyRedirectCommands(l, i.redirectTo, c);
					return i.redirectTo.startsWith("/") ? xE(d) : this.lineralizeSegments(i, d).pipe(nt(f => this.expandSegment(n, e, r, f.concat(u), o, !1)))
				}
				matchSegmentAgainstRoute(n, e, r, i, s) {
					return "**" === r.path ? (n = mE(r, n), r.loadChildren ? (r._loadedRoutes ? O({
						routes: r._loadedRoutes,
						injector: r._loadedInjector
					}) : this.configLoader.loadChildren(n, r)).pipe(j(a => (r._loadedRoutes = a.routes, r._loadedInjector = a.injector, new X(i, {})))) : O(new X(i, {}))) : bE(e, r, i, n).pipe(Gn(({
						matched: o,
						consumedSegments: a,
						remainingSegments: l
					}) => o ? this.getChildConfig(n = r._injector ?? n, r, i).pipe(nt(c => {
						const d = c.injector ?? n,
							f = c.routes,
							{
								segmentGroup: h,
								slicedSegments: g
							} = Pu(e, a, l, f),
							m = new X(h.segments, h.children);
						if (0 === g.length && m.hasChildren()) return this.expandChildren(d, f, m).pipe(j(v => new X(a, v)));
						if (0 === f.length && 0 === g.length) return O(new X(a, {}));
						const _ = fn(r) === s;
						return this.expandSegment(d, m, f, g, _ ? Y : s, !0).pipe(j(C => new X(a.concat(C.segments), C.children)))
					})) : sa(e)))
				}
				getChildConfig(n, e, r) {
					return e.children ? O({
						routes: e.children,
						injector: n
					}) : e.loadChildren ? void 0 !== e._loadedRoutes ? O({
						routes: e._loadedRoutes,
						injector: e._loadedInjector
					}) : function Lj(t, n, e, r) {
						const i = n.canLoad;
						return void 0 === i || 0 === i.length ? O(!0) : O(i.map(o => {
							const a = Ds(o, t);
							return Hr(function Cj(t) {
								return t && ia(t.canLoad)
							}(a) ? a.canLoad(n, e) : t.runInContext(() => a(n, e)))
						})).pipe(xs(), vE())
					}(n, e, r).pipe(nt(i => i ? this.configLoader.loadChildren(n, e).pipe(je(s => {
						e._loadedRoutes = s.routes, e._loadedInjector = s.injector
					})) : function Uj(t) {
						return _s(hE(Bu, 3))
					}())) : O({
						routes: [],
						injector: n
					})
				}
				lineralizeSegments(n, e) {
					let r = [],
						i = e.root;
					for (;;) {
						if (r = r.concat(i.segments), 0 === i.numberOfChildren) return O(r);
						if (i.numberOfChildren > 1 || !i.children[Y]) return _s(new w(4e3, Bu));
						i = i.children[Y]
					}
				}
				applyRedirectCommands(n, e, r) {
					return this.applyRedirectCreateUrlTree(e, this.urlSerializer.parse(e), n, r)
				}
				applyRedirectCreateUrlTree(n, e, r, i) {
					const s = this.createSegmentGroup(n, e.root, r, i);
					return new gi(s, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment)
				}
				createQueryParams(n, e) {
					const r = {};
					return st(n, (i, s) => {
						if ("string" == typeof i && i.startsWith(":")) {
							const a = i.substring(1);
							r[s] = e[a]
						} else r[s] = i
					}), r
				}
				createSegmentGroup(n, e, r, i) {
					const s = this.createSegments(n, e.segments, r, i);
					let o = {};
					return st(e.children, (a, l) => {
						o[l] = this.createSegmentGroup(n, a, r, i)
					}), new X(s, o)
				}
				createSegments(n, e, r, i) {
					return e.map(s => s.path.startsWith(":") ? this.findPosParam(n, s, i) : this.findOrReturn(s, r))
				}
				findPosParam(n, e, r) {
					const i = r[e.path.substring(1)];
					if (!i) throw new w(4001, Bu);
					return i
				}
				findOrReturn(n, e) {
					let r = 0;
					for (const i of e) {
						if (i.path === n.path) return e.splice(r), i;
						r++
					}
					return n
				}
			}
			class qj {}
			class Yj {
				constructor(n, e, r, i, s, o, a, l) {
					this.injector = n, this.rootComponentType = e, this.config = r, this.urlTree = i, this.url = s, this.paramsInheritanceStrategy = o, this.relativeLinkResolution = a, this.urlSerializer = l
				}
				recognize() {
					const n = Pu(this.urlTree.root, [], [], this.config.filter(e => void 0 === e.redirectTo), this.relativeLinkResolution).segmentGroup;
					return this.processSegmentGroup(this.injector, this.config, n, Y).pipe(j(e => {
						if (null === e) return null;
						const r = new Ou([], Object.freeze({}), Object.freeze({
								...this.urlTree.queryParams
							}), this.urlTree.fragment, {}, Y, this.rootComponentType, null, this.urlTree.root, -1, {}),
							i = new gr(r, e),
							s = new cE(this.url, i);
						return this.inheritParamsAndData(s._root), s
					}))
				}
				inheritParamsAndData(n) {
					const e = n.value,
						r = uE(e, this.paramsInheritanceStrategy);
					e.params = Object.freeze(r.params), e.data = Object.freeze(r.data), n.children.forEach(i => this.inheritParamsAndData(i))
				}
				processSegmentGroup(n, e, r, i) {
					return 0 === r.segments.length && r.hasChildren() ? this.processChildren(n, e, r) : this.processSegment(n, e, r, r.segments, i)
				}
				processChildren(n, e, r) {
					return $e(Object.keys(r.children)).pipe(kr(i => {
						const s = r.children[i],
							o = yE(e, i);
						return this.processSegmentGroup(n, o, s, i)
					}), Vx((i, s) => i && s ? (i.push(...s), i) : null), function mH(t, n = !1) {
						return Ve((e, r) => {
							let i = 0;
							e.subscribe(Oe(r, s => {
								const o = t(s, i++);
								(o || n) && r.next(s), !o && r.complete()
							}))
						})
					}(i => null !== i), xu(null), Bx(), j(i => {
						if (null === i) return null;
						const s = EE(i);
						return function Zj(t) {
							t.sort((n, e) => n.value.outlet === Y ? -1 : e.value.outlet === Y ? 1 : n.value.outlet.localeCompare(e.value.outlet))
						}(s), s
					}))
				}
				processSegment(n, e, r, i, s) {
					return $e(e).pipe(kr(o => this.processSegmentAgainstRoute(o._injector ?? n, o, r, i, s)), Br(o => !!o), hr(o => {
						if (Up(o)) return CE(r, i, s) ? O([]) : O(null);
						throw o
					}))
				}
				processSegmentAgainstRoute(n, e, r, i, s) {
					if (e.redirectTo || !wE(e, r, i, s)) return O(null);
					let o;
					if ("**" === e.path) {
						const a = i.length > 0 ? $x(i).parameters : {},
							l = AE(r) + i.length;
						o = O({
							snapshot: new Ou(i, a, Object.freeze({
								...this.urlTree.queryParams
							}), this.urlTree.fragment, IE(e), fn(e), e.component ?? e._loadedComponent ?? null, e, ME(r), l, TE(e), l),
							consumedSegments: [],
							remainingSegments: []
						})
					} else o = bE(r, e, i, n).pipe(j(({
						matched: a,
						consumedSegments: l,
						remainingSegments: u,
						parameters: c
					}) => {
						if (!a) return null;
						const d = AE(r) + l.length;
						return {
							snapshot: new Ou(l, c, Object.freeze({
								...this.urlTree.queryParams
							}), this.urlTree.fragment, IE(e), fn(e), e.component ?? e._loadedComponent ?? null, e, ME(r), d, TE(e), d),
							consumedSegments: l,
							remainingSegments: u
						}
					}));
					return o.pipe(Gn(a => {
						if (null === a) return O(null);
						const {
							snapshot: l,
							consumedSegments: u,
							remainingSegments: c
						} = a;
						n = e._injector ?? n;
						const d = e._loadedInjector ?? n,
							f = function Xj(t) {
								return t.children ? t.children : t.loadChildren ? t._loadedRoutes : []
							}(e),
							{
								segmentGroup: h,
								slicedSegments: g
							} = Pu(r, u, c, f.filter(_ => void 0 === _.redirectTo), this.relativeLinkResolution);
						if (0 === g.length && h.hasChildren()) return this.processChildren(d, f, h).pipe(j(_ => null === _ ? null : [new gr(l, _)]));
						if (0 === f.length && 0 === g.length) return O([new gr(l, [])]);
						const m = fn(e) === s;
						return this.processSegment(d, f, h, g, m ? Y : s).pipe(j(_ => null === _ ? null : [new gr(l, _)]))
					}))
				}
			}

			function Jj(t) {
				const n = t.value.routeConfig;
				return n && "" === n.path && void 0 === n.redirectTo
			}

			function EE(t) {
				const n = [],
					e = new Set;
				for (const r of t) {
					if (!Jj(r)) {
						n.push(r);
						continue
					}
					const i = n.find(s => r.value.routeConfig === s.value.routeConfig);
					void 0 !== i ? (i.children.push(...r.children), e.add(i)) : n.push(r)
				}
				for (const r of e) {
					const i = EE(r.children);
					n.push(new gr(r.value, i))
				}
				return n.filter(r => !e.has(r))
			}

			function ME(t) {
				let n = t;
				for (; n._sourceSegment;) n = n._sourceSegment;
				return n
			}

			function AE(t) {
				let n = t,
					e = n._segmentIndexShift ?? 0;
				for (; n._sourceSegment;) n = n._sourceSegment, e += n._segmentIndexShift ?? 0;
				return e - 1
			}

			function IE(t) {
				return t.data || {}
			}

			function TE(t) {
				return t.resolve || {}
			}

			function FE(t) {
				return "string" == typeof t.title || null === t.title
			}

			function Wp(t) {
				return Gn(n => {
					const e = t(n);
					return e ? $e(e).pipe(j(() => n)) : O(n)
				})
			}
			let RE = (() => {
					class t {
						buildTitle(e) {
							let r, i = e.root;
							for (; void 0 !== i;) r = this.getResolvedTitleForRoute(i) ?? r, i = i.children.find(s => s.outlet === Y);
							return r
						}
						getResolvedTitleForRoute(e) {
							return e.data[qo]
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275prov = E({
						token: t,
						factory: function() {
							return ge(OE)
						},
						providedIn: "root"
					}), t
				})(),
				OE = (() => {
					class t extends RE {
						constructor(e) {
							super(), this.title = e
						}
						updateTitle(e) {
							const r = this.buildTitle(e);
							void 0 !== r && this.title.setTitle(r)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(wC))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac,
						providedIn: "root"
					}), t
				})();
			class l2 {}
			class c2 extends class u2 {
				shouldDetach(n) {
					return !1
				}
				store(n, e) {}
				shouldAttach(n) {
					return !1
				}
				retrieve(n) {
					return null
				}
				shouldReuseRoute(n, e) {
					return n.routeConfig === e.routeConfig
				}
			} {}
			const $u = new S("", {
					providedIn: "root",
					factory: () => ({})
				}),
				qp = new S("ROUTES");
			let Kp = (() => {
				class t {
					constructor(e, r) {
						this.injector = e, this.compiler = r, this.componentLoaders = new WeakMap, this.childrenLoaders = new WeakMap
					}
					loadComponent(e) {
						if (this.componentLoaders.get(e)) return this.componentLoaders.get(e);
						if (e._loadedComponent) return O(e._loadedComponent);
						this.onLoadStartListener && this.onLoadStartListener(e);
						const r = Hr(e.loadComponent()).pipe(je(s => {
								this.onLoadEndListener && this.onLoadEndListener(e), e._loadedComponent = s
							}), Eu(() => {
								this.componentLoaders.delete(e)
							})),
							i = new Lx(r, () => new Re).pipe(Dp());
						return this.componentLoaders.set(e, i), i
					}
					loadChildren(e, r) {
						if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
						if (r._loadedRoutes) return O({
							routes: r._loadedRoutes,
							injector: r._loadedInjector
						});
						this.onLoadStartListener && this.onLoadStartListener(r);
						const s = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(j(a => {
								this.onLoadEndListener && this.onLoadEndListener(r);
								let l, u, c = !1;
								Array.isArray(a) ? u = a : (l = a.create(e).injector, u = jx(l.get(qp, [], P.Self | P.Optional)));
								return {
									routes: u.map($p),
									injector: l
								}
							}), Eu(() => {
								this.childrenLoaders.delete(r)
							})),
							o = new Lx(s, () => new Re).pipe(Dp());
						return this.childrenLoaders.set(r, o), o
					}
					loadModuleFactoryOrRoutes(e) {
						return Hr(e()).pipe(nt(r => r instanceof pb || Array.isArray(r) ? O(r) : $e(this.compiler.compileModuleAsync(r))))
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(It), b(Hf))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			class f2 {}
			class h2 {
				shouldProcessUrl(n) {
					return !0
				}
				extract(n) {
					return n
				}
				merge(n, e) {
					return n
				}
			}

			function p2(t) {
				throw t
			}

			function g2(t, n, e) {
				return n.parse("/")
			}
			const m2 = {
					paths: "exact",
					fragment: "ignored",
					matrixParams: "ignored",
					queryParams: "exact"
				},
				y2 = {
					paths: "subset",
					fragment: "ignored",
					matrixParams: "ignored",
					queryParams: "subset"
				};

			function NE() {
				const t = ge(Kx),
					n = ge(ea),
					e = ge(th),
					r = ge(It),
					i = ge(Hf),
					s = ge(qp, {
						optional: !0
					}) ?? [],
					o = ge($u, {
						optional: !0
					}) ?? {},
					a = ge(OE),
					l = ge(RE, {
						optional: !0
					}),
					u = ge(f2, {
						optional: !0
					}),
					c = ge(l2, {
						optional: !0
					}),
					d = new qe(null, t, n, e, r, i, jx(s));
				return u && (d.urlHandlingStrategy = u), c && (d.routeReuseStrategy = c), d.titleStrategy = l ?? a,
					function _2(t, n) {
						t.errorHandler && (n.errorHandler = t.errorHandler), t.malformedUriErrorHandler && (n.malformedUriErrorHandler = t.malformedUriErrorHandler), t.onSameUrlNavigation && (n.onSameUrlNavigation = t.onSameUrlNavigation), t.paramsInheritanceStrategy && (n.paramsInheritanceStrategy = t.paramsInheritanceStrategy), t.relativeLinkResolution && (n.relativeLinkResolution = t.relativeLinkResolution), t.urlUpdateStrategy && (n.urlUpdateStrategy = t.urlUpdateStrategy), t.canceledNavigationResolution && (n.canceledNavigationResolution = t.canceledNavigationResolution)
					}(o, d), d
			}
			let qe = (() => {
				class t {
					constructor(e, r, i, s, o, a, l) {
						this.rootComponentType = e, this.urlSerializer = r, this.rootContexts = i, this.location = s, this.config = l, this.lastSuccessfulNavigation = null, this.currentNavigation = null, this.disposed = !1, this.navigationId = 0, this.currentPageId = 0, this.isNgZoneEnabled = !1, this.events = new Re, this.errorHandler = p2, this.malformedUriErrorHandler = g2, this.navigated = !1, this.lastSuccessfulId = -1, this.afterPreactivation = () => O(void 0), this.urlHandlingStrategy = new h2, this.routeReuseStrategy = new c2, this.onSameUrlNavigation = "ignore", this.paramsInheritanceStrategy = "emptyOnly", this.urlUpdateStrategy = "deferred", this.relativeLinkResolution = "corrected", this.canceledNavigationResolution = "replace", this.configLoader = o.get(Kp), this.configLoader.onLoadEndListener = f => this.triggerEvent(new XH(f)), this.configLoader.onLoadStartListener = f => this.triggerEvent(new ZH(f)), this.ngModule = o.get(ii), this.console = o.get(Vk);
						const d = o.get(se);
						this.isNgZoneEnabled = d instanceof se && se.isInAngularZone(), this.resetConfig(l), this.currentUrlTree = function wH() {
							return new gi(new X([], {}), {}, null)
						}(), this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.routerState = lE(this.currentUrlTree, this.rootComponentType), this.transitions = new qt({
							id: 0,
							targetPageId: 0,
							currentUrlTree: this.currentUrlTree,
							currentRawUrl: this.currentUrlTree,
							extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
							urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
							rawUrl: this.currentUrlTree,
							extras: {},
							resolve: null,
							reject: null,
							promise: Promise.resolve(!0),
							source: "imperative",
							restoredState: null,
							currentSnapshot: this.routerState.snapshot,
							targetSnapshot: null,
							currentRouterState: this.routerState,
							targetRouterState: null,
							guards: {
								canActivateChecks: [],
								canDeactivateChecks: []
							},
							guardsResult: null
						}), this.navigations = this.setupNavigations(this.transitions), this.processNavigations()
					}
					get browserPageId() {
						return this.location.getState()?.\u0275routerPageId
					}
					setupNavigations(e) {
						const r = this.events;
						return e.pipe(Gt(i => 0 !== i.id), j(i => ({
							...i,
							extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl)
						})), Gn(i => {
							let s = !1,
								o = !1;
							return O(i).pipe(je(a => {
								this.currentNavigation = {
									id: a.id,
									initialUrl: a.rawUrl,
									extractedUrl: a.extractedUrl,
									trigger: a.source,
									extras: a.extras,
									previousNavigation: this.lastSuccessfulNavigation ? {
										...this.lastSuccessfulNavigation,
										previousNavigation: null
									} : null
								}
							}), Gn(a => {
								const l = this.browserUrlTree.toString(),
									u = !this.navigated || a.extractedUrl.toString() !== l || l !== this.currentUrlTree.toString();
								if (("reload" === this.onSameUrlNavigation || u) && this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)) return LE(a.source) && (this.browserUrlTree = a.extractedUrl), O(a).pipe(Gn(d => {
									const f = this.transitions.getValue();
									return r.next(new Rp(d.id, this.serializeUrl(d.extractedUrl), d.source, d.restoredState)), f !== this.transitions.getValue() ? Fn : Promise.resolve(d)
								}), function Wj(t, n, e, r) {
									return Gn(i => function Gj(t, n, e, r, i) {
										return new zj(t, n, e, r, i).apply()
									}(t, n, e, i.extractedUrl, r).pipe(j(s => ({
										...i,
										urlAfterRedirects: s
									}))))
								}(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config), je(d => {
									this.currentNavigation = {
										...this.currentNavigation,
										finalUrl: d.urlAfterRedirects
									}, i.urlAfterRedirects = d.urlAfterRedirects
								}), function t2(t, n, e, r, i, s) {
									return nt(o => function Qj(t, n, e, r, i, s, o = "emptyOnly", a = "legacy") {
										return new Yj(t, n, e, r, i, o, a, s).recognize().pipe(Gn(l => null === l ? function Kj(t) {
											return new Ce(n => n.error(t))
										}(new qj) : O(l)))
									}(t, n, e, o.urlAfterRedirects, r.serialize(o.urlAfterRedirects), r, i, s).pipe(j(a => ({
										...o,
										targetSnapshot: a
									}))))
								}(this.ngModule.injector, this.rootComponentType, this.config, this.urlSerializer, this.paramsInheritanceStrategy, this.relativeLinkResolution), je(d => {
									if (i.targetSnapshot = d.targetSnapshot, "eager" === this.urlUpdateStrategy) {
										if (!d.extras.skipLocationChange) {
											const h = this.urlHandlingStrategy.merge(d.urlAfterRedirects, d.rawUrl);
											this.setBrowserUrl(h, d)
										}
										this.browserUrlTree = d.urlAfterRedirects
									}
									const f = new WH(d.id, this.serializeUrl(d.extractedUrl), this.serializeUrl(d.urlAfterRedirects), d.targetSnapshot);
									r.next(f)
								}));
								if (u && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
									const {
										id: f,
										extractedUrl: h,
										source: g,
										restoredState: m,
										extras: _
									} = a, y = new Rp(f, this.serializeUrl(h), g, m);
									r.next(y);
									const C = lE(h, this.rootComponentType).snapshot;
									return O(i = {
										...a,
										targetSnapshot: C,
										urlAfterRedirects: h,
										extras: {
											..._,
											skipLocationChange: !1,
											replaceUrl: !1
										}
									})
								}
								return this.rawUrlTree = a.rawUrl, a.resolve(null), Fn
							}), je(a => {
								const l = new qH(a.id, this.serializeUrl(a.extractedUrl), this.serializeUrl(a.urlAfterRedirects), a.targetSnapshot);
								this.triggerEvent(l)
							}), j(a => i = {
								...a,
								guards: yj(a.targetSnapshot, a.currentSnapshot, this.rootContexts)
							}), function Sj(t, n) {
								return nt(e => {
									const {
										targetSnapshot: r,
										currentSnapshot: i,
										guards: {
											canActivateChecks: s,
											canDeactivateChecks: o
										}
									} = e;
									return 0 === o.length && 0 === s.length ? O({
										...e,
										guardsResult: !0
									}) : function Ij(t, n, e, r) {
										return $e(t).pipe(nt(i => function Nj(t, n, e, r, i) {
											const s = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
											return s && 0 !== s.length ? O(s.map(a => {
												const l = ta(n) ?? i,
													u = Ds(a, l);
												return Hr(function Ej(t) {
													return t && ia(t.canDeactivate)
												}(u) ? u.canDeactivate(t, n, e, r) : l.runInContext(() => u(t, n, e, r))).pipe(Br())
											})).pipe(xs()) : O(!0)
										}(i.component, i.route, e, n, r)), Br(i => !0 !== i, !0))
									}(o, r, i, t).pipe(nt(a => a && function wj(t) {
										return "boolean" == typeof t
									}(a) ? function Tj(t, n, e, r) {
										return $e(n).pipe(kr(i => Du(function Rj(t, n) {
											return null !== t && n && n(new JH(t)), O(!0)
										}(i.route.parent, r), function Fj(t, n) {
											return null !== t && n && n(new tj(t)), O(!0)
										}(i.route, r), function kj(t, n, e) {
											const r = n[n.length - 1],
												s = n.slice(0, n.length - 1).reverse().map(o => function _j(t) {
													const n = t.routeConfig ? t.routeConfig.canActivateChild : null;
													return n && 0 !== n.length ? {
														node: t,
														guards: n
													} : null
												}(o)).filter(o => null !== o).map(o => Nx(() => O(o.guards.map(l => {
													const u = ta(o.node) ?? e,
														c = Ds(l, u);
													return Hr(function xj(t) {
														return t && ia(t.canActivateChild)
													}(c) ? c.canActivateChild(r, t) : u.runInContext(() => c(r, t))).pipe(Br())
												})).pipe(xs())));
											return O(s).pipe(xs())
										}(t, i.path, e), function Oj(t, n, e) {
											const r = n.routeConfig ? n.routeConfig.canActivate : null;
											if (!r || 0 === r.length) return O(!0);
											const i = r.map(s => Nx(() => {
												const o = ta(n) ?? e,
													a = Ds(s, o);
												return Hr(function Dj(t) {
													return t && ia(t.canActivate)
												}(a) ? a.canActivate(n, t) : o.runInContext(() => a(n, t))).pipe(Br())
											}));
											return O(i).pipe(xs())
										}(t, i.route, e))), Br(i => !0 !== i, !0))
									}(r, s, t, n) : O(a)), j(a => ({
										...e,
										guardsResult: a
									})))
								})
							}(this.ngModule.injector, a => this.triggerEvent(a)), je(a => {
								if (i.guardsResult = a.guardsResult, yi(a.guardsResult)) throw fE(0, a.guardsResult);
								const l = new KH(a.id, this.serializeUrl(a.extractedUrl), this.serializeUrl(a.urlAfterRedirects), a.targetSnapshot, !!a.guardsResult);
								this.triggerEvent(l)
							}), Gt(a => !!a.guardsResult || (this.restoreHistory(a), this.cancelNavigationTransition(a, "", 3), !1)), Wp(a => {
								if (a.guards.canActivateChecks.length) return O(a).pipe(je(l => {
									const u = new QH(l.id, this.serializeUrl(l.extractedUrl), this.serializeUrl(l.urlAfterRedirects), l.targetSnapshot);
									this.triggerEvent(u)
								}), Gn(l => {
									let u = !1;
									return O(l).pipe(function n2(t, n) {
										return nt(e => {
											const {
												targetSnapshot: r,
												guards: {
													canActivateChecks: i
												}
											} = e;
											if (!i.length) return O(e);
											let s = 0;
											return $e(i).pipe(kr(o => function r2(t, n, e, r) {
												const i = t.routeConfig,
													s = t._resolve;
												return void 0 !== i?.title && !FE(i) && (s[qo] = i.title),
													function s2(t, n, e, r) {
														const i = function o2(t) {
															return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)]
														}(t);
														if (0 === i.length) return O({});
														const s = {};
														return $e(i).pipe(nt(o => function a2(t, n, e, r) {
															const i = ta(n) ?? r,
																s = Ds(t, i);
															return Hr(s.resolve ? s.resolve(n, e) : i.runInContext(() => s(n, e)))
														}(t[o], n, e, r).pipe(Br(), je(a => {
															s[o] = a
														}))), xp(1), function yH(t) {
															return j(() => t)
														}(s), hr(o => Up(o) ? Fn : _s(o)))
													}(s, t, n, r).pipe(j(o => (t._resolvedData = o, t.data = uE(t, e).resolve, i && FE(i) && (t.data[qo] = i.title), null)))
											}(o.route, r, t, n)), je(() => s++), xp(1), nt(o => s === i.length ? O(e) : Fn))
										})
									}(this.paramsInheritanceStrategy, this.ngModule.injector), je({
										next: () => u = !0,
										complete: () => {
											u || (this.restoreHistory(l), this.cancelNavigationTransition(l, "", 2))
										}
									}))
								}), je(l => {
									const u = new YH(l.id, this.serializeUrl(l.extractedUrl), this.serializeUrl(l.urlAfterRedirects), l.targetSnapshot);
									this.triggerEvent(u)
								}))
							}), Wp(a => {
								const l = u => {
									const c = [];
									u.routeConfig?.loadComponent && !u.routeConfig._loadedComponent && c.push(this.configLoader.loadComponent(u.routeConfig).pipe(je(d => {
										u.component = d
									}), j(() => {})));
									for (const d of u.children) c.push(...l(d));
									return c
								};
								return Cp(l(a.targetSnapshot.root)).pipe(xu(), Vr(1))
							}), Wp(() => this.afterPreactivation()), j(a => {
								const l = function oj(t, n, e) {
									const r = Jo(t, n._root, e ? e._root : void 0);
									return new aE(r, n)
								}(this.routeReuseStrategy, a.targetSnapshot, a.currentRouterState);
								return i = {
									...a,
									targetRouterState: l
								}
							}), je(a => {
								this.currentUrlTree = a.urlAfterRedirects, this.rawUrlTree = this.urlHandlingStrategy.merge(a.urlAfterRedirects, a.rawUrl), this.routerState = a.targetRouterState, "deferred" === this.urlUpdateStrategy && (a.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, a), this.browserUrlTree = a.urlAfterRedirects)
							}), ((t, n, e) => j(r => (new mj(n, r.targetRouterState, r.currentRouterState, e).activate(t), r)))(this.rootContexts, this.routeReuseStrategy, a => this.triggerEvent(a)), je({
								next() {
									s = !0
								},
								complete() {
									s = !0
								}
							}), Eu(() => {
								s || o || this.cancelNavigationTransition(i, "", 1), this.currentNavigation?.id === i.id && (this.currentNavigation = null)
							}), hr(a => {
								if (o = !0, gE(a)) {
									pE(a) || (this.navigated = !0, this.restoreHistory(i, !0));
									const l = new Ru(i.id, this.serializeUrl(i.extractedUrl), a.message, a.cancellationCode);
									if (r.next(l), pE(a)) {
										const u = this.urlHandlingStrategy.merge(a.url, this.rawUrlTree),
											c = {
												skipLocationChange: i.extras.skipLocationChange,
												replaceUrl: "eager" === this.urlUpdateStrategy || LE(i.source)
											};
										this.scheduleNavigation(u, "imperative", null, c, {
											resolve: i.resolve,
											reject: i.reject,
											promise: i.promise
										})
									} else i.resolve(!1)
								} else {
									this.restoreHistory(i, !0);
									const l = new iE(i.id, this.serializeUrl(i.extractedUrl), a, i.targetSnapshot ?? void 0);
									r.next(l);
									try {
										i.resolve(this.errorHandler(a))
									} catch (u) {
										i.reject(u)
									}
								}
								return Fn
							}))
						}))
					}
					resetRootComponentType(e) {
						this.rootComponentType = e, this.routerState.root.component = this.rootComponentType
					}
					setTransition(e) {
						this.transitions.next({
							...this.transitions.value,
							...e
						})
					}
					initialNavigation() {
						this.setUpLocationChangeListener(), 0 === this.navigationId && this.navigateByUrl(this.location.path(!0), {
							replaceUrl: !0
						})
					}
					setUpLocationChangeListener() {
						this.locationSubscription || (this.locationSubscription = this.location.subscribe(e => {
							const r = "popstate" === e.type ? "popstate" : "hashchange";
							"popstate" === r && setTimeout(() => {
								const i = {
										replaceUrl: !0
									},
									s = e.state?.navigationId ? e.state : null;
								if (s) {
									const a = {
										...s
									};
									delete a.navigationId, delete a.\u0275routerPageId, 0 !== Object.keys(a).length && (i.state = a)
								}
								const o = this.parseUrl(e.url);
								this.scheduleNavigation(o, r, s, i)
							}, 0)
						}))
					}
					get url() {
						return this.serializeUrl(this.currentUrlTree)
					}
					getCurrentNavigation() {
						return this.currentNavigation
					}
					triggerEvent(e) {
						this.events.next(e)
					}
					resetConfig(e) {
						this.config = e.map($p), this.navigated = !1, this.lastSuccessfulId = -1
					}
					ngOnDestroy() {
						this.dispose()
					}
					dispose() {
						this.transitions.complete(), this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = void 0), this.disposed = !0
					}
					createUrlTree(e, r = {}) {
						const {
							relativeTo: i,
							queryParams: s,
							fragment: o,
							queryParamsHandling: a,
							preserveFragment: l
						} = r, u = i || this.routerState.root, c = l ? this.currentUrlTree.fragment : o;
						let d = null;
						switch (a) {
							case "merge":
								d = {
									...this.currentUrlTree.queryParams,
									...s
								};
								break;
							case "preserve":
								d = this.currentUrlTree.queryParams;
								break;
							default:
								d = s || null
						}
						return null !== d && (d = this.removeEmptyProps(d)), HH(u, this.currentUrlTree, e, d, c ?? null)
					}
					navigateByUrl(e, r = {
						skipLocationChange: !1
					}) {
						const i = yi(e) ? e : this.parseUrl(e),
							s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
						return this.scheduleNavigation(s, "imperative", null, r)
					}
					navigate(e, r = {
						skipLocationChange: !1
					}) {
						return function v2(t) {
							for (let n = 0; n < t.length; n++) {
								if (null == t[n]) throw new w(4008, false)
							}
						}(e), this.navigateByUrl(this.createUrlTree(e, r), r)
					}
					serializeUrl(e) {
						return this.urlSerializer.serialize(e)
					}
					parseUrl(e) {
						let r;
						try {
							r = this.urlSerializer.parse(e)
						} catch (i) {
							r = this.malformedUriErrorHandler(i, this.urlSerializer, e)
						}
						return r
					}
					isActive(e, r) {
						let i;
						if (i = !0 === r ? {
								...m2
							} : !1 === r ? {
								...y2
							} : r, yi(e)) return Gx(this.currentUrlTree, e, i);
						const s = this.parseUrl(e);
						return Gx(this.currentUrlTree, s, i)
					}
					removeEmptyProps(e) {
						return Object.keys(e).reduce((r, i) => {
							const s = e[i];
							return null != s && (r[i] = s), r
						}, {})
					}
					processNavigations() {
						this.navigations.subscribe(e => {
							this.navigated = !0, this.lastSuccessfulId = e.id, this.currentPageId = e.targetPageId, this.events.next(new _i(e.id, this.serializeUrl(e.extractedUrl), this.serializeUrl(this.currentUrlTree))), this.lastSuccessfulNavigation = this.currentNavigation, this.titleStrategy?.updateTitle(this.routerState.snapshot), e.resolve(!0)
						}, e => {
							this.console.warn(`Unhandled Navigation Error: ${e}`)
						})
					}
					scheduleNavigation(e, r, i, s, o) {
						if (this.disposed) return Promise.resolve(!1);
						let a, l, u;
						o ? (a = o.resolve, l = o.reject, u = o.promise) : u = new Promise((f, h) => {
							a = f, l = h
						});
						const c = ++this.navigationId;
						let d;
						return "computed" === this.canceledNavigationResolution ? (0 === this.currentPageId && (i = this.location.getState()), d = i && i.\u0275routerPageId ? i.\u0275routerPageId : s.replaceUrl || s.skipLocationChange ? this.browserPageId ?? 0 : (this.browserPageId ?? 0) + 1) : d = 0, this.setTransition({
							id: c,
							targetPageId: d,
							source: r,
							restoredState: i,
							currentUrlTree: this.currentUrlTree,
							currentRawUrl: this.rawUrlTree,
							rawUrl: e,
							extras: s,
							resolve: a,
							reject: l,
							promise: u,
							currentSnapshot: this.routerState.snapshot,
							currentRouterState: this.routerState
						}), u.catch(f => Promise.reject(f))
					}
					setBrowserUrl(e, r) {
						const i = this.urlSerializer.serialize(e),
							s = {
								...r.extras.state,
								...this.generateNgRouterState(r.id, r.targetPageId)
							};
						this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl ? this.location.replaceState(i, "", s) : this.location.go(i, "", s)
					}
					restoreHistory(e, r = !1) {
						if ("computed" === this.canceledNavigationResolution) {
							const i = this.currentPageId - e.targetPageId;
							"popstate" !== e.source && "eager" !== this.urlUpdateStrategy && this.currentUrlTree !== this.currentNavigation?.finalUrl || 0 === i ? this.currentUrlTree === this.currentNavigation?.finalUrl && 0 === i && (this.resetState(e), this.browserUrlTree = e.currentUrlTree, this.resetUrlToCurrentUrlTree()) : this.location.historyGo(i)
						} else "replace" === this.canceledNavigationResolution && (r && this.resetState(e), this.resetUrlToCurrentUrlTree())
					}
					resetState(e) {
						this.routerState = e.currentRouterState, this.currentUrlTree = e.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, e.rawUrl)
					}
					resetUrlToCurrentUrlTree() {
						this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
					}
					cancelNavigationTransition(e, r, i) {
						const s = new Ru(e.id, this.serializeUrl(e.extractedUrl), r, i);
						this.triggerEvent(s), e.resolve(!1)
					}
					generateNgRouterState(e, r) {
						return "computed" === this.canceledNavigationResolution ? {
							navigationId: e,
							\u0275routerPageId: r
						} : {
							navigationId: e
						}
					}
				}
				return t.\u0275fac = function(e) {
					Vd()
				}, t.\u0275prov = E({
					token: t,
					factory: function() {
						return NE()
					},
					providedIn: "root"
				}), t
			})();

			function LE(t) {
				return "imperative" !== t
			}
			class PE {}
			let C2 = (() => {
				class t {
					constructor(e, r, i, s, o) {
						this.router = e, this.injector = i, this.preloadingStrategy = s, this.loader = o
					}
					setUpPreloading() {
						this.subscription = this.router.events.pipe(Gt(e => e instanceof _i), kr(() => this.preload())).subscribe(() => {})
					}
					preload() {
						return this.processRoutes(this.injector, this.router.config)
					}
					ngOnDestroy() {
						this.subscription && this.subscription.unsubscribe()
					}
					processRoutes(e, r) {
						const i = [];
						for (const s of r) {
							s.providers && !s._injector && (s._injector = vl(s.providers, e, `Route: ${s.path}`));
							const o = s._injector ?? e,
								a = s._loadedInjector ?? o;
							s.loadChildren && !s._loadedRoutes && void 0 === s.canLoad || s.loadComponent && !s._loadedComponent ? i.push(this.preloadConfig(o, s)) : (s.children || s._loadedRoutes) && i.push(this.processRoutes(a, s.children ?? s._loadedRoutes))
						}
						return $e(i).pipe(Ei())
					}
					preloadConfig(e, r) {
						return this.preloadingStrategy.preload(r, () => {
							let i;
							i = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(e, r) : O(null);
							const s = i.pipe(nt(o => null === o ? O(void 0) : (r._loadedRoutes = o.routes, r._loadedInjector = o.injector, this.processRoutes(o.injector ?? e, o.routes))));
							return r.loadComponent && !r._loadedComponent ? $e([s, this.loader.loadComponent(r)]).pipe(Ei()) : s
						})
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(qe), b(Hf), b(Mr), b(PE), b(Kp))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const Zp = new S("");
			let VE = (() => {
				class t {
					constructor(e, r, i = {}) {
						this.router = e, this.viewportScroller = r, this.options = i, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, i.scrollPositionRestoration = i.scrollPositionRestoration || "disabled", i.anchorScrolling = i.anchorScrolling || "disabled"
					}
					init() {
						"disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
					}
					createScrollEvents() {
						return this.router.events.subscribe(e => {
							e instanceof Rp ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = e.navigationTrigger, this.restoredId = e.restoredState ? e.restoredState.navigationId : 0) : e instanceof _i && (this.lastId = e.id, this.scheduleScrollEvent(e, this.router.parseUrl(e.urlAfterRedirects).fragment))
						})
					}
					consumeScrollEvents() {
						return this.router.events.subscribe(e => {
							e instanceof sE && (e.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(e.position) : e.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(e.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
						})
					}
					scheduleScrollEvent(e, r) {
						this.router.triggerEvent(new sE(e, "popstate" === this.lastSource ? this.store[this.restoredId] : null, r))
					}
					ngOnDestroy() {
						this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(), this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe()
					}
				}
				return t.\u0275fac = function(e) {
					Vd()
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac
				}), t
			})();

			function Es(t, n) {
				return {
					\u0275kind: t,
					\u0275providers: n
				}
			}

			function Xp(t) {
				return [{
					provide: qp,
					multi: !0,
					useValue: t
				}]
			}

			function HE() {
				const t = ge(It);
				return n => {
					const e = t.get(Mo);
					if (n !== e.components[0]) return;
					const r = t.get(qe),
						i = t.get(jE);
					1 === t.get(Jp) && r.initialNavigation(), t.get($E, null, P.Optional)?.setUpPreloading(), t.get(Zp, null, P.Optional)?.init(), r.resetRootComponentType(e.componentTypes[0]), i.next(), i.complete()
				}
			}
			const jE = new S("", {
					factory: () => new Re
				}),
				Jp = new S("", {
					providedIn: "root",
					factory: () => 1
				});
			const $E = new S("");

			function M2(t) {
				return Es(0, [{
					provide: $E,
					useExisting: C2
				}, {
					provide: PE,
					useExisting: t
				}])
			}
			const UE = new S("ROUTER_FORROOT_GUARD"),
				A2 = [th, {
					provide: Kx,
					useClass: Mp
				}, {
					provide: qe,
					useFactory: NE
				}, ea, {
					provide: vi,
					useFactory: function BE(t) {
						return t.routerState.root
					},
					deps: [qe]
				}, Kp];

			function S2() {
				return new lw("Router", qe)
			}
			let GE = (() => {
				class t {
					constructor(e) {}
					static forRoot(e, r) {
						return {
							ngModule: t,
							providers: [A2, [], Xp(e), {
									provide: UE,
									useFactory: R2,
									deps: [
										[qe, new Er, new Ui]
									]
								}, {
									provide: $u,
									useValue: r || {}
								}, r?.useHash ? {
									provide: li,
									useClass: MN
								} : {
									provide: li,
									useClass: Ow
								}, {
									provide: Zp,
									useFactory: () => {
										const t = ge(qe),
											n = ge(G1),
											e = ge($u);
										return e.scrollOffset && n.setOffset(e.scrollOffset), new VE(t, n, e)
									}
								}, r?.preloadingStrategy ? M2(r.preloadingStrategy).\u0275providers : [], {
									provide: lw,
									multi: !0,
									useFactory: S2
								}, r?.initialNavigation ? O2(r) : [],
								[{
									provide: zE,
									useFactory: HE
								}, {
									provide: Bf,
									multi: !0,
									useExisting: zE
								}]
							]
						}
					}
					static forChild(e) {
						return {
							ngModule: t,
							providers: [Xp(e)]
						}
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(UE, 8))
				}, t.\u0275mod = de({
					type: t
				}), t.\u0275inj = ce({
					imports: [Hp]
				}), t
			})();

			function R2(t) {
				return "guarded"
			}

			function O2(t) {
				return ["disabled" === t.initialNavigation ? Es(3, [{
					provide: Dl,
					multi: !0,
					useFactory: () => {
						const n = ge(qe);
						return () => {
							n.setUpLocationChangeListener()
						}
					}
				}, {
					provide: Jp,
					useValue: 2
				}]).\u0275providers : [], "enabledBlocking" === t.initialNavigation ? Es(2, [{
					provide: Jp,
					useValue: 0
				}, {
					provide: Dl,
					multi: !0,
					deps: [It],
					useFactory: n => {
						const e = n.get(xN, Promise.resolve());
						let r = !1;
						return () => e.then(() => new Promise(s => {
							const o = n.get(qe),
								a = n.get(jE);
							(function i(s) {
								n.get(qe).events.pipe(Gt(a => a instanceof _i || a instanceof Ru || a instanceof iE), j(a => a instanceof _i || a instanceof Ru && (0 === a.code || 1 === a.code) && null), Gt(a => null !== a), Vr(1)).subscribe(() => {
									s()
								})
							})(() => {
								s(!0), r = !0
							}), o.afterPreactivation = () => (s(!0), r || a.closed ? O(void 0) : a), o.initialNavigation()
						}))
					}
				}]).\u0275providers : []]
			}
			const zE = new S("");
			let N2 = (() => {
				class t {
					constructor(e) {
						this.http = e
					}
					getFlag() {
						return this.http.get("https://admin.pwnme.org/api/v1/dashboard")
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(Ho))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const L2 = new S("cdk-dir-doc", {
					providedIn: "root",
					factory: function P2() {
						return ge(oe)
					}
				}),
				V2 = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
			let tg = (() => {
					class t {
						constructor(e) {
							if (this.value = "ltr", this.change = new Me, e) {
								const i = e.documentElement ? e.documentElement.dir : null;
								this.value = function B2(t) {
									const n = t?.toLowerCase() || "";
									return "auto" === n && typeof navigator < "u" && navigator?.language ? V2.test(navigator.language) ? "rtl" : "ltr" : "rtl" === n ? "rtl" : "ltr"
								}((e.body ? e.body.dir : null) || i || "ltr")
							}
						}
						ngOnDestroy() {
							this.change.complete()
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(L2, 8))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac,
						providedIn: "root"
					}), t
				})(),
				ng = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({}), t
				})();

			function WE(t) {
				for (let n in t) {
					let e = t[n] ?? "";
					switch (n) {
						case "display":
							t.display = "flex" === e ? ["-webkit-flex", "flex"] : "inline-flex" === e ? ["-webkit-inline-flex", "inline-flex"] : e;
							break;
						case "align-items":
						case "align-self":
						case "align-content":
						case "flex":
						case "flex-basis":
						case "flex-flow":
						case "flex-grow":
						case "flex-shrink":
						case "flex-wrap":
						case "justify-content":
							t["-webkit-" + n] = e;
							break;
						case "flex-direction":
							t["-webkit-flex-direction"] = e, t["flex-direction"] = e;
							break;
						case "order":
							t.order = t["-webkit-" + n] = isNaN(+e) ? "0" : e
					}
				}
				return t
			}
			const rg = "inline",
				Wu = ["row", "column", "row-reverse", "column-reverse"];

			function qE(t) {
				let [n, e, r] = KE(t);
				return function j2(t, n = null, e = !1) {
					return {
						display: e ? "inline-flex" : "flex",
						"box-sizing": "border-box",
						"flex-direction": t,
						"flex-wrap": n || null
					}
				}(n, e, r)
			}

			function KE(t) {
				t = t?.toLowerCase() ?? "";
				let [n, e, r] = t.split(" ");
				return Wu.find(i => i === n) || (n = Wu[0]), e === rg && (e = r !== rg ? r : "", r = rg), [n, H2(e), !!r]
			}

			function oa(t) {
				let [n] = KE(t);
				return n.indexOf("row") > -1
			}

			function H2(t) {
				if (t) switch (t.toLowerCase()) {
					case "reverse":
					case "wrap-reverse":
					case "reverse-wrap":
						t = "wrap-reverse";
						break;
					case "no":
					case "none":
					case "nowrap":
						t = "nowrap";
						break;
					default:
						t = "wrap"
				}
				return t
			}

			function mr(t, ...n) {
				if (null == t) throw TypeError("Cannot convert undefined or null to object");
				for (let e of n)
					if (null != e)
						for (let r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
				return t
			}
			const U2 = {
					provide: Bf,
					useFactory: function $2(t, n) {
						return () => {
							if (ui(n)) {
								const e = Array.from(t.querySelectorAll(`[class*=${QE}]`)),
									r = /\bflex-layout-.+?\b/g;
								e.forEach(i => {
									i.classList.contains(`${QE}ssr`) && i.parentNode ? i.parentNode.removeChild(i) : i.className.replace(r, "")
								})
							}
						}
					},
					deps: [oe, an],
					multi: !0
				},
				QE = "flex-layout-";
			let ig = (() => {
				class t {}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275mod = de({
					type: t
				}), t.\u0275inj = ce({
					providers: [U2]
				}), t
			})();
			class bi {
				constructor(n = !1, e = "all", r = "", i = "", s = 0) {
					this.matches = n, this.mediaQuery = e, this.mqAlias = r, this.suffix = i, this.priority = s, this.property = ""
				}
				clone() {
					return new bi(this.matches, this.mediaQuery, this.mqAlias, this.suffix)
				}
			}
			let G2 = (() => {
				class t {
					constructor() {
						this.stylesheet = new Map
					}
					addStyleToElement(e, r, i) {
						const s = this.stylesheet.get(e);
						s ? s.set(r, i) : this.stylesheet.set(e, new Map([
							[r, i]
						]))
					}
					clearStyles() {
						this.stylesheet.clear()
					}
					getStyleForElement(e, r) {
						const i = this.stylesheet.get(e);
						let s = "";
						if (i) {
							const o = i.get(r);
							("number" == typeof o || "string" == typeof o) && (s = o + "")
						}
						return s
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const sg = {
					addFlexToParent: !0,
					addOrientationBps: !1,
					disableDefaultBps: !1,
					disableVendorPrefixes: !1,
					serverLoaded: !1,
					useColumnBasisZero: !0,
					printWithBreakpoints: [],
					mediaTriggerAutoRestore: !0,
					ssrObserveBreakpoints: [],
					multiplier: void 0,
					defaultUnit: "px",
					detectLayoutDisplay: !1
				},
				Sn = new S("Flex Layout token, config options for the library", {
					providedIn: "root",
					factory: () => sg
				}),
				Ms = new S("FlexLayoutServerLoaded", {
					providedIn: "root",
					factory: () => !1
				}),
				og = new S("Flex Layout token, collect all breakpoints into one provider", {
					providedIn: "root",
					factory: () => null
				});

			function YE(t, n) {
				return t = t?.clone() ?? new bi, n && (t.mqAlias = n.alias, t.mediaQuery = n.mediaQuery, t.suffix = n.suffix, t.priority = n.priority), t
			}
			class Pe {
				constructor() {
					this.shouldCache = !0
				}
				sideEffect(n, e, r) {}
			}
			let xe = (() => {
				class t {
					constructor(e, r, i, s) {
						this._serverStylesheet = e, this._serverModuleLoaded = r, this._platformId = i, this.layoutConfig = s
					}
					applyStyleToElement(e, r, i = null) {
						let s = {};
						"string" == typeof r && (s[r] = i, r = s), s = this.layoutConfig.disableVendorPrefixes ? r : WE(r), this._applyMultiValueStyleToElement(s, e)
					}
					applyStyleToElements(e, r = []) {
						const i = this.layoutConfig.disableVendorPrefixes ? e : WE(e);
						r.forEach(s => {
							this._applyMultiValueStyleToElement(i, s)
						})
					}
					getFlowDirection(e) {
						const r = "flex-direction";
						let i = this.lookupStyle(e, r);
						return [i || "row", this.lookupInlineStyle(e, r) || gs(this._platformId) && this._serverModuleLoaded ? i : ""]
					}
					hasWrap(e) {
						return "wrap" === this.lookupStyle(e, "flex-wrap")
					}
					lookupAttributeValue(e, r) {
						return e.getAttribute(r) ?? ""
					}
					lookupInlineStyle(e, r) {
						return ui(this._platformId) ? e.style.getPropertyValue(r) : function z2(t, n) {
							return ZE(t)[n] ?? ""
						}(e, r)
					}
					lookupStyle(e, r, i = !1) {
						let s = "";
						return e && ((s = this.lookupInlineStyle(e, r)) || (ui(this._platformId) ? i || (s = getComputedStyle(e).getPropertyValue(r)) : this._serverModuleLoaded && (s = this._serverStylesheet.getStyleForElement(e, r)))), s ? s.trim() : ""
					}
					_applyMultiValueStyleToElement(e, r) {
						Object.keys(e).sort().forEach(i => {
							const s = e[i],
								o = Array.isArray(s) ? s : [s];
							o.sort();
							for (let a of o) a = a ? a + "" : "", ui(this._platformId) || !this._serverModuleLoaded ? ui(this._platformId) ? r.style.setProperty(i, a) : W2(r, i, a) : this._serverStylesheet.addStyleToElement(r, i, a)
						})
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(G2), b(Ms), b(an), b(Sn))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();

			function W2(t, n, e) {
				n = n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
				const r = ZE(t);
				r[n] = e ?? "",
					function q2(t, n) {
						let e = "";
						for (const r in n) n[r] && (e += `${r}:${n[r]};`);
						t.setAttribute("style", e)
					}(t, r)
			}

			function ZE(t) {
				const n = {},
					e = t.getAttribute("style");
				if (e) {
					const r = e.split(/;+/g);
					for (let i = 0; i < r.length; i++) {
						const s = r[i].trim();
						if (s.length > 0) {
							const o = s.indexOf(":");
							if (-1 === o) throw new Error(`Invalid CSS style: ${s}`);
							n[s.substr(0, o).trim()] = s.substr(o + 1).trim()
						}
					}
				}
				return n
			}

			function aa(t, n) {
				return (n && n.priority || 0) - (t && t.priority || 0)
			}

			function K2(t, n) {
				return (t.priority || 0) - (n.priority || 0)
			}
			let ag = (() => {
				class t {
					constructor(e, r, i) {
						this._zone = e, this._platformId = r, this._document = i, this.source = new qt(new bi(!0)), this.registry = new Map, this.pendingRemoveListenerFns = [], this._observable$ = this.source.asObservable()
					}
					get activations() {
						const e = [];
						return this.registry.forEach((r, i) => {
							r.matches && e.push(i)
						}), e
					}
					isActive(e) {
						return this.registry.get(e)?.matches ?? this.registerQuery(e).some(i => i.matches)
					}
					observe(e, r = !1) {
						if (e && e.length) {
							const i = this._observable$.pipe(Gt(o => !r || e.indexOf(o.mediaQuery) > -1));
							return _a(new Ce(o => {
								const a = this.registerQuery(e);
								if (a.length) {
									const l = a.pop();
									a.forEach(u => {
										o.next(u)
									}), this.source.next(l)
								}
								o.complete()
							}), i)
						}
						return this._observable$
					}
					registerQuery(e) {
						const r = Array.isArray(e) ? e : [e],
							i = [];
						return function Q2(t, n) {
							const e = t.filter(r => !XE[r]);
							if (e.length > 0) {
								const r = e.join(", ");
								try {
									const i = n.createElement("style");
									i.setAttribute("type", "text/css"), i.styleSheet || i.appendChild(n.createTextNode(`\n/*\n  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners\n  see http://bit.ly/2sd4HMP\n*/\n@media ${r} {.fx-query-test{ }}\n`)), n.head.appendChild(i), e.forEach(s => XE[s] = i)
								} catch (i) {
									console.error(i)
								}
							}
						}(r, this._document), r.forEach(s => {
							const o = l => {
								this._zone.run(() => this.source.next(new bi(l.matches, s)))
							};
							let a = this.registry.get(s);
							a || (a = this.buildMQL(s), a.addListener(o), this.pendingRemoveListenerFns.push(() => a.removeListener(o)), this.registry.set(s, a)), a.matches && i.push(new bi(!0, s))
						}), i
					}
					ngOnDestroy() {
						let e;
						for (; e = this.pendingRemoveListenerFns.pop();) e()
					}
					buildMQL(e) {
						return function Z2(t, n) {
							return n && window.matchMedia("all").addListener ? window.matchMedia(t) : function Y2(t) {
								const n = new EventTarget;
								return n.matches = "all" === t || "" === t, n.media = t, n.addListener = () => {}, n.removeListener = () => {}, n.addEventListener = () => {}, n.dispatchEvent = () => !1, n.onchange = null, n
							}(t)
						}(e, ui(this._platformId))
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(se), b(an), b(oe))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const XE = {},
				X2 = [{
					alias: "xs",
					mediaQuery: "screen and (min-width: 0px) and (max-width: 599.98px)",
					priority: 1e3
				}, {
					alias: "sm",
					mediaQuery: "screen and (min-width: 600px) and (max-width: 959.98px)",
					priority: 900
				}, {
					alias: "md",
					mediaQuery: "screen and (min-width: 960px) and (max-width: 1279.98px)",
					priority: 800
				}, {
					alias: "lg",
					mediaQuery: "screen and (min-width: 1280px) and (max-width: 1919.98px)",
					priority: 700
				}, {
					alias: "xl",
					mediaQuery: "screen and (min-width: 1920px) and (max-width: 4999.98px)",
					priority: 600
				}, {
					alias: "lt-sm",
					overlapping: !0,
					mediaQuery: "screen and (max-width: 599.98px)",
					priority: 950
				}, {
					alias: "lt-md",
					overlapping: !0,
					mediaQuery: "screen and (max-width: 959.98px)",
					priority: 850
				}, {
					alias: "lt-lg",
					overlapping: !0,
					mediaQuery: "screen and (max-width: 1279.98px)",
					priority: 750
				}, {
					alias: "lt-xl",
					overlapping: !0,
					priority: 650,
					mediaQuery: "screen and (max-width: 1919.98px)"
				}, {
					alias: "gt-xs",
					overlapping: !0,
					mediaQuery: "screen and (min-width: 600px)",
					priority: -950
				}, {
					alias: "gt-sm",
					overlapping: !0,
					mediaQuery: "screen and (min-width: 960px)",
					priority: -850
				}, {
					alias: "gt-md",
					overlapping: !0,
					mediaQuery: "screen and (min-width: 1280px)",
					priority: -750
				}, {
					alias: "gt-lg",
					overlapping: !0,
					mediaQuery: "screen and (min-width: 1920px)",
					priority: -650
				}],
				JE = "(orientation: portrait) and (max-width: 599.98px)",
				eM = "(orientation: landscape) and (max-width: 959.98px)",
				tM = "(orientation: portrait) and (min-width: 600px) and (max-width: 839.98px)",
				nM = "(orientation: landscape) and (min-width: 960px) and (max-width: 1279.98px)",
				rM = "(orientation: portrait) and (min-width: 840px)",
				iM = "(orientation: landscape) and (min-width: 1280px)",
				yr = {
					HANDSET: `${JE}, ${eM}`,
					TABLET: `${tM} , ${nM}`,
					WEB: `${rM}, ${iM} `,
					HANDSET_PORTRAIT: `${JE}`,
					TABLET_PORTRAIT: `${tM} `,
					WEB_PORTRAIT: `${rM}`,
					HANDSET_LANDSCAPE: `${eM}`,
					TABLET_LANDSCAPE: `${nM}`,
					WEB_LANDSCAPE: `${iM}`
				},
				J2 = [{
					alias: "handset",
					priority: 2e3,
					mediaQuery: yr.HANDSET
				}, {
					alias: "handset.landscape",
					priority: 2e3,
					mediaQuery: yr.HANDSET_LANDSCAPE
				}, {
					alias: "handset.portrait",
					priority: 2e3,
					mediaQuery: yr.HANDSET_PORTRAIT
				}, {
					alias: "tablet",
					priority: 2100,
					mediaQuery: yr.TABLET
				}, {
					alias: "tablet.landscape",
					priority: 2100,
					mediaQuery: yr.TABLET_LANDSCAPE
				}, {
					alias: "tablet.portrait",
					priority: 2100,
					mediaQuery: yr.TABLET_PORTRAIT
				}, {
					alias: "web",
					priority: 2200,
					mediaQuery: yr.WEB,
					overlapping: !0
				}, {
					alias: "web.landscape",
					priority: 2200,
					mediaQuery: yr.WEB_LANDSCAPE,
					overlapping: !0
				}, {
					alias: "web.portrait",
					priority: 2200,
					mediaQuery: yr.WEB_PORTRAIT,
					overlapping: !0
				}],
				e$ = /(\.|-|_)/g;

			function t$(t) {
				let n = t.length > 0 ? t.charAt(0) : "",
					e = t.length > 1 ? t.slice(1) : "";
				return n.toUpperCase() + e
			}
			const s$ = new S("Token (@angular/flex-layout) Breakpoints", {
				providedIn: "root",
				factory: () => {
					const t = ge(og),
						n = ge(Sn),
						e = [].concat.apply([], (t || []).map(i => Array.isArray(i) ? i : [i]));
					return function i$(t, n = []) {
						const e = {};
						return t.forEach(r => {
								e[r.alias] = r
							}), n.forEach(r => {
								e[r.alias] ? mr(e[r.alias], r) : e[r.alias] = r
							}),
							function r$(t) {
								return t.forEach(n => {
									n.suffix || (n.suffix = function n$(t) {
										return t.replace(e$, "|").split("|").map(t$).join("")
									}(n.alias), n.overlapping = !!n.overlapping)
								}), t
							}(Object.keys(e).map(r => e[r]))
					}((n.disableDefaultBps ? [] : X2).concat(n.addOrientationBps ? J2 : []), e)
				}
			});
			let lg = (() => {
				class t {
					constructor(e) {
						this.findByMap = new Map, this.items = [...e].sort(K2)
					}
					findByAlias(e) {
						return e ? this.findWithPredicate(e, r => r.alias === e) : null
					}
					findByQuery(e) {
						return this.findWithPredicate(e, r => r.mediaQuery === e)
					}
					get overlappings() {
						return this.items.filter(e => e.overlapping)
					}
					get aliases() {
						return this.items.map(e => e.alias)
					}
					get suffixes() {
						return this.items.map(e => e?.suffix ?? "")
					}
					findWithPredicate(e, r) {
						let i = this.findByMap.get(e);
						return i || (i = this.items.find(r) ?? null, this.findByMap.set(e, i)), i ?? null
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(s$))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const As = "print",
				o$ = {
					alias: As,
					mediaQuery: As,
					priority: 1e3
				};
			let a$ = (() => {
				class t {
					constructor(e, r, i) {
						this.breakpoints = e, this.layoutConfig = r, this._document = i, this.registeredBeforeAfterPrintHooks = !1, this.isPrintingBeforeAfterEvent = !1, this.beforePrintEventListeners = [], this.afterPrintEventListeners = [], this.formerActivations = null, this.isPrinting = !1, this.queue = new l$, this.deactivations = []
					}
					withPrintQuery(e) {
						return [...e, As]
					}
					isPrintEvent(e) {
						return e.mediaQuery.startsWith(As)
					}
					get printAlias() {
						return [...this.layoutConfig.printWithBreakpoints ?? []]
					}
					get printBreakPoints() {
						return this.printAlias.map(e => this.breakpoints.findByAlias(e)).filter(e => null !== e)
					}
					getEventBreakpoints({
						mediaQuery: e
					}) {
						const r = this.breakpoints.findByQuery(e);
						return (r ? [...this.printBreakPoints, r] : this.printBreakPoints).sort(aa)
					}
					updateEvent(e) {
						let r = this.breakpoints.findByQuery(e.mediaQuery);
						return this.isPrintEvent(e) && (r = this.getEventBreakpoints(e)[0], e.mediaQuery = r?.mediaQuery ?? ""), YE(e, r)
					}
					registerBeforeAfterPrintHooks(e) {
						if (!this._document.defaultView || this.registeredBeforeAfterPrintHooks) return;
						this.registeredBeforeAfterPrintHooks = !0;
						const r = () => {
								this.isPrinting || (this.isPrintingBeforeAfterEvent = !0, this.startPrinting(e, this.getEventBreakpoints(new bi(!0, As))), e.updateStyles())
							},
							i = () => {
								this.isPrintingBeforeAfterEvent = !1, this.isPrinting && (this.stopPrinting(e), e.updateStyles())
							};
						this._document.defaultView.addEventListener("beforeprint", r), this._document.defaultView.addEventListener("afterprint", i), this.beforePrintEventListeners.push(r), this.afterPrintEventListeners.push(i)
					}
					interceptEvents(e) {
						return r => {
							this.isPrintEvent(r) ? r.matches && !this.isPrinting ? (this.startPrinting(e, this.getEventBreakpoints(r)), e.updateStyles()) : !r.matches && this.isPrinting && !this.isPrintingBeforeAfterEvent && (this.stopPrinting(e), e.updateStyles()) : this.collectActivations(e, r)
						}
					}
					blockPropagation() {
						return e => !(this.isPrinting || this.isPrintEvent(e))
					}
					startPrinting(e, r) {
						this.isPrinting = !0, this.formerActivations = e.activatedBreakpoints, e.activatedBreakpoints = this.queue.addPrintBreakpoints(r)
					}
					stopPrinting(e) {
						e.activatedBreakpoints = this.deactivations, this.deactivations = [], this.formerActivations = null, this.queue.clear(), this.isPrinting = !1
					}
					collectActivations(e, r) {
						if (!this.isPrinting || this.isPrintingBeforeAfterEvent) {
							if (!this.isPrintingBeforeAfterEvent) return void(this.deactivations = []);
							if (!r.matches) {
								const i = this.breakpoints.findByQuery(r.mediaQuery);
								if (i) {
									const s = this.formerActivations && this.formerActivations.includes(i),
										o = !this.formerActivations && e.activatedBreakpoints.includes(i);
									(s || o) && (this.deactivations.push(i), this.deactivations.sort(aa))
								}
							}
						}
					}
					ngOnDestroy() {
						this._document.defaultView && (this.beforePrintEventListeners.forEach(e => this._document.defaultView.removeEventListener("beforeprint", e)), this.afterPrintEventListeners.forEach(e => this._document.defaultView.removeEventListener("afterprint", e)))
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(lg), b(Sn), b(oe))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			class l$ {
				constructor() {
					this.printBreakpoints = []
				}
				addPrintBreakpoints(n) {
					return n.push(o$), n.sort(aa), n.forEach(e => this.addBreakpoint(e)), this.printBreakpoints
				}
				addBreakpoint(n) {
					n && void 0 === this.printBreakpoints.find(r => r.mediaQuery === n.mediaQuery) && (this.printBreakpoints = function u$(t) {
						return t?.mediaQuery.startsWith(As) ?? !1
					}(n) ? [n, ...this.printBreakpoints] : [...this.printBreakpoints, n])
				}
				clear() {
					this.printBreakpoints = []
				}
			}
			let Ae = (() => {
				class t {
					constructor(e, r, i) {
						this.matchMedia = e, this.breakpoints = r, this.hook = i, this._useFallbacks = !0, this._activatedBreakpoints = [], this.elementMap = new Map, this.elementKeyMap = new WeakMap, this.watcherMap = new WeakMap, this.updateMap = new WeakMap, this.clearMap = new WeakMap, this.subject = new Re, this.observeActivations()
					}
					get activatedAlias() {
						return this.activatedBreakpoints[0]?.alias ?? ""
					}
					set activatedBreakpoints(e) {
						this._activatedBreakpoints = [...e]
					}
					get activatedBreakpoints() {
						return [...this._activatedBreakpoints]
					}
					set useFallbacks(e) {
						this._useFallbacks = e
					}
					onMediaChange(e) {
						const r = this.findByQuery(e.mediaQuery);
						if (r) {
							e = YE(e, r);
							const i = this.activatedBreakpoints.indexOf(r);
							e.matches && -1 === i ? (this._activatedBreakpoints.push(r), this._activatedBreakpoints.sort(aa), this.updateStyles()) : !e.matches && -1 !== i && (this._activatedBreakpoints.splice(i, 1), this._activatedBreakpoints.sort(aa), this.updateStyles())
						}
					}
					init(e, r, i, s, o = []) {
						sM(this.updateMap, e, r, i), sM(this.clearMap, e, r, s), this.buildElementKeyMap(e, r), this.watchExtraTriggers(e, r, o)
					}
					getValue(e, r, i) {
						const s = this.elementMap.get(e);
						if (s) {
							const o = void 0 !== i ? s.get(i) : this.getActivatedValues(s, r);
							if (o) return o.get(r)
						}
					}
					hasValue(e, r) {
						const i = this.elementMap.get(e);
						if (i) {
							const s = this.getActivatedValues(i, r);
							if (s) return void 0 !== s.get(r) || !1
						}
						return !1
					}
					setValue(e, r, i, s) {
						let o = this.elementMap.get(e);
						if (o) {
							const l = (o.get(s) ?? new Map).set(r, i);
							o.set(s, l), this.elementMap.set(e, o)
						} else o = (new Map).set(s, (new Map).set(r, i)), this.elementMap.set(e, o);
						const a = this.getValue(e, r);
						void 0 !== a && this.updateElement(e, r, a)
					}
					trackValue(e, r) {
						return this.subject.asObservable().pipe(Gt(i => i.element === e && i.key === r))
					}
					updateStyles() {
						this.elementMap.forEach((e, r) => {
							const i = new Set(this.elementKeyMap.get(r));
							let s = this.getActivatedValues(e);
							s && s.forEach((o, a) => {
								this.updateElement(r, a, o), i.delete(a)
							}), i.forEach(o => {
								if (s = this.getActivatedValues(e, o), s) {
									const a = s.get(o);
									this.updateElement(r, o, a)
								} else this.clearElement(r, o)
							})
						})
					}
					clearElement(e, r) {
						const i = this.clearMap.get(e);
						if (i) {
							const s = i.get(r);
							s && (s(), this.subject.next({
								element: e,
								key: r,
								value: ""
							}))
						}
					}
					updateElement(e, r, i) {
						const s = this.updateMap.get(e);
						if (s) {
							const o = s.get(r);
							o && (o(i), this.subject.next({
								element: e,
								key: r,
								value: i
							}))
						}
					}
					releaseElement(e) {
						const r = this.watcherMap.get(e);
						r && (r.forEach(s => s.unsubscribe()), this.watcherMap.delete(e));
						const i = this.elementMap.get(e);
						i && (i.forEach((s, o) => i.delete(o)), this.elementMap.delete(e))
					}
					triggerUpdate(e, r) {
						const i = this.elementMap.get(e);
						if (i) {
							const s = this.getActivatedValues(i, r);
							s && (r ? this.updateElement(e, r, s.get(r)) : s.forEach((o, a) => this.updateElement(e, a, o)))
						}
					}
					buildElementKeyMap(e, r) {
						let i = this.elementKeyMap.get(e);
						i || (i = new Set, this.elementKeyMap.set(e, i)), i.add(r)
					}
					watchExtraTriggers(e, r, i) {
						if (i && i.length) {
							let s = this.watcherMap.get(e);
							if (s || (s = new Map, this.watcherMap.set(e, s)), !s.get(r)) {
								const a = _a(...i).subscribe(() => {
									const l = this.getValue(e, r);
									this.updateElement(e, r, l)
								});
								s.set(r, a)
							}
						}
					}
					findByQuery(e) {
						return this.breakpoints.findByQuery(e)
					}
					getActivatedValues(e, r) {
						for (let s = 0; s < this.activatedBreakpoints.length; s++) {
							const a = e.get(this.activatedBreakpoints[s].alias);
							if (a && (void 0 === r || a.has(r) && null != a.get(r))) return a
						}
						if (!this._useFallbacks) return;
						const i = e.get("");
						return void 0 === r || i && i.has(r) ? i : void 0
					}
					observeActivations() {
						const e = this.breakpoints.items.map(r => r.mediaQuery);
						this.hook.registerBeforeAfterPrintHooks(this), this.matchMedia.observe(this.hook.withPrintQuery(e)).pipe(je(this.hook.interceptEvents(this)), Gt(this.hook.blockPropagation())).subscribe(this.onMediaChange.bind(this))
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(ag), b(lg), b(a$))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();

			function sM(t, n, e, r) {
				if (void 0 !== r) {
					const i = t.get(n) ?? new Map;
					i.set(e, r), t.set(n, i)
				}
			}
			let Ie = (() => {
				class t {
					constructor(e, r, i, s) {
						this.elementRef = e, this.styleBuilder = r, this.styler = i, this.marshal = s, this.DIRECTIVE_KEY = "", this.inputs = [], this.mru = {}, this.destroySubject = new Re, this.styleCache = new Map
					}
					get parentElement() {
						return this.elementRef.nativeElement.parentElement
					}
					get nativeElement() {
						return this.elementRef.nativeElement
					}
					get activatedValue() {
						return this.marshal.getValue(this.nativeElement, this.DIRECTIVE_KEY)
					}
					set activatedValue(e) {
						this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, e, this.marshal.activatedAlias)
					}
					ngOnChanges(e) {
						Object.keys(e).forEach(r => {
							if (-1 !== this.inputs.indexOf(r)) {
								const i = r.split(".").slice(1).join(".");
								this.setValue(e[r].currentValue, i)
							}
						})
					}
					ngOnDestroy() {
						this.destroySubject.next(), this.destroySubject.complete(), this.marshal.releaseElement(this.nativeElement)
					}
					init(e = []) {
						this.marshal.init(this.elementRef.nativeElement, this.DIRECTIVE_KEY, this.updateWithValue.bind(this), this.clearStyles.bind(this), e)
					}
					addStyles(e, r) {
						const i = this.styleBuilder,
							s = i.shouldCache;
						let o = this.styleCache.get(e);
						(!o || !s) && (o = i.buildStyles(e, r), s && this.styleCache.set(e, o)), this.mru = {
							...o
						}, this.applyStyleToElement(o), i.sideEffect(e, o, r)
					}
					clearStyles() {
						Object.keys(this.mru).forEach(e => {
							this.mru[e] = ""
						}), this.applyStyleToElement(this.mru), this.mru = {}, this.currentValue = void 0
					}
					triggerUpdate() {
						this.marshal.triggerUpdate(this.nativeElement, this.DIRECTIVE_KEY)
					}
					getFlexFlowDirection(e, r = !1) {
						if (e) {
							const [i, s] = this.styler.getFlowDirection(e);
							if (!s && r) {
								const o = qE(i);
								this.styler.applyStyleToElements(o, [e])
							}
							return i.trim()
						}
						return "row"
					}
					hasWrap(e) {
						return this.styler.hasWrap(e)
					}
					applyStyleToElement(e, r, i = this.nativeElement) {
						this.styler.applyStyleToElement(i, e, r)
					}
					setValue(e, r) {
						this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, e, r)
					}
					updateWithValue(e) {
						this.currentValue !== e && (this.addStyles(e), this.currentValue = e)
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(p(U), p(Pe), p(xe), p(Ae))
				}, t.\u0275dir = x({
					type: t,
					features: [mt]
				}), t
			})();

			function oM(t, n = "1", e = "1") {
				let r = [n, e, t],
					i = t.indexOf("calc");
				if (i > 0) {
					r[2] = aM(t.substring(i).trim());
					let s = t.substr(0, i).trim().split(" ");
					2 == s.length && (r[0] = s[0], r[1] = s[1])
				} else if (0 == i) r[2] = aM(t.trim());
				else {
					let s = t.split(" ");
					r = 3 === s.length ? s : [n, e, t]
				}
				return r
			}

			function aM(t) {
				return t.replace(/[\s]/g, "").replace(/[\/\*\+\-]/g, " $& ")
			}

			function In(t) {
				return Ve((n, e) => {
					Ot(t).subscribe(Oe(e, () => e.complete(), sc)), !e.closed && n.subscribe(e)
				})
			}
			EventTarget;
			let f$ = (() => {
				class t extends Pe {
					buildStyles(e, {
						display: r
					}) {
						const i = qE(e);
						return {
							...i,
							display: "none" === r ? r : i.display
						}
					}
				}
				return t.\u0275fac = function() {
					let n;
					return function(r) {
						return (n || (n = k(t)))(r || t)
					}
				}(), t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const h$ = ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"];
			let p$ = (() => {
					class t extends Ie {
						constructor(e, r, i, s, o) {
							super(e, i, r, s), this._config = o, this.DIRECTIVE_KEY = "layout", this.init()
						}
						updateWithValue(e) {
							const i = this._config.detectLayoutDisplay ? this.styler.lookupStyle(this.nativeElement, "display") : "";
							this.styleCache = cM.get(i) ?? new Map, cM.set(i, this.styleCache), this.currentValue !== e && (this.addStyles(e, {
								display: i
							}), this.currentValue = e)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(U), p(xe), p(f$), p(Ae), p(Sn))
					}, t.\u0275dir = x({
						type: t,
						features: [M]
					}), t
				})(),
				uM = (() => {
					class t extends p$ {
						constructor() {
							super(...arguments), this.inputs = h$
						}
					}
					return t.\u0275fac = function() {
						let n;
						return function(r) {
							return (n || (n = k(t)))(r || t)
						}
					}(), t.\u0275dir = x({
						type: t,
						selectors: [
							["", "fxLayout", ""],
							["", "fxLayout.xs", ""],
							["", "fxLayout.sm", ""],
							["", "fxLayout.md", ""],
							["", "fxLayout.lg", ""],
							["", "fxLayout.xl", ""],
							["", "fxLayout.lt-sm", ""],
							["", "fxLayout.lt-md", ""],
							["", "fxLayout.lt-lg", ""],
							["", "fxLayout.lt-xl", ""],
							["", "fxLayout.gt-xs", ""],
							["", "fxLayout.gt-sm", ""],
							["", "fxLayout.gt-md", ""],
							["", "fxLayout.gt-lg", ""]
						],
						inputs: {
							fxLayout: "fxLayout",
							"fxLayout.xs": "fxLayout.xs",
							"fxLayout.sm": "fxLayout.sm",
							"fxLayout.md": "fxLayout.md",
							"fxLayout.lg": "fxLayout.lg",
							"fxLayout.xl": "fxLayout.xl",
							"fxLayout.lt-sm": "fxLayout.lt-sm",
							"fxLayout.lt-md": "fxLayout.lt-md",
							"fxLayout.lt-lg": "fxLayout.lt-lg",
							"fxLayout.lt-xl": "fxLayout.lt-xl",
							"fxLayout.gt-xs": "fxLayout.gt-xs",
							"fxLayout.gt-sm": "fxLayout.gt-sm",
							"fxLayout.gt-md": "fxLayout.gt-md",
							"fxLayout.gt-lg": "fxLayout.gt-lg"
						},
						features: [M]
					}), t
				})();
			const cM = new Map;
			let M$ = (() => {
				class t extends Pe {
					constructor(e) {
						super(), this.layoutConfig = e
					}
					buildStyles(e, r) {
						let [i, s, ...o] = e.split(" "), a = o.join(" ");
						const l = r.direction.indexOf("column") > -1 ? "column" : "row",
							u = oa(l) ? "max-width" : "max-height",
							c = oa(l) ? "min-width" : "min-height",
							d = String(a).indexOf("calc") > -1,
							f = d || "auto" === a,
							h = String(a).indexOf("%") > -1 && !d,
							g = String(a).indexOf("px") > -1 || String(a).indexOf("rem") > -1 || String(a).indexOf("em") > -1 || String(a).indexOf("vw") > -1 || String(a).indexOf("vh") > -1;
						let m = d || g;
						i = "0" == i ? 0 : i, s = "0" == s ? 0 : s;
						const _ = !i && !s;
						let y = {};
						const C = {
							"max-width": null,
							"max-height": null,
							"min-width": null,
							"min-height": null
						};
						switch (a || "") {
							case "":
								const v = !1 !== this.layoutConfig.useColumnBasisZero;
								a = "row" === l ? "0%" : v ? "0.000000001px" : "auto";
								break;
							case "initial":
							case "nogrow":
								i = 0, a = "auto";
								break;
							case "grow":
								a = "100%";
								break;
							case "noshrink":
								s = 0, a = "auto";
								break;
							case "auto":
								break;
							case "none":
								i = 0, s = 0, a = "auto";
								break;
							default:
								!m && !h && !isNaN(a) && (a += "%"), "0%" === a && (m = !0), "0px" === a && (a = "0%"), y = mr(C, d ? {
									"flex-grow": i,
									"flex-shrink": s,
									"flex-basis": m ? a : "100%"
								} : {
									flex: `${i} ${s} ${m?a:"100%"}`
								})
						}
						return y.flex || y["flex-grow"] || (y = mr(C, d ? {
							"flex-grow": i,
							"flex-shrink": s,
							"flex-basis": a
						} : {
							flex: `${i} ${s} ${a}`
						})), "0%" !== a && "0px" !== a && "0.000000001px" !== a && "auto" !== a && (y[c] = _ || m && i ? a : null, y[u] = _ || !f && s ? a : null), y[c] || y[u] ? r.hasWrap && (y[d ? "flex-basis" : "flex"] = y[u] ? d ? y[u] : `${i} ${s} ${y[u]}` : d ? y[c] : `${i} ${s} ${y[c]}`) : y = mr(C, d ? {
							"flex-grow": i,
							"flex-shrink": s,
							"flex-basis": a
						} : {
							flex: `${i} ${s} ${a}`
						}), mr(y, {
							"box-sizing": "border-box"
						})
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(Sn))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const A$ = ["fxFlex", "fxFlex.xs", "fxFlex.sm", "fxFlex.md", "fxFlex.lg", "fxFlex.xl", "fxFlex.lt-sm", "fxFlex.lt-md", "fxFlex.lt-lg", "fxFlex.lt-xl", "fxFlex.gt-xs", "fxFlex.gt-sm", "fxFlex.gt-md", "fxFlex.gt-lg"];
			let S$ = (() => {
					class t extends Ie {
						constructor(e, r, i, s, o) {
							super(e, s, r, o), this.layoutConfig = i, this.marshal = o, this.DIRECTIVE_KEY = "flex", this.direction = void 0, this.wrap = void 0, this.flexGrow = "1", this.flexShrink = "1", this.init()
						}
						get shrink() {
							return this.flexShrink
						}
						set shrink(e) {
							this.flexShrink = e || "1", this.triggerReflow()
						}
						get grow() {
							return this.flexGrow
						}
						set grow(e) {
							this.flexGrow = e || "1", this.triggerReflow()
						}
						ngOnInit() {
							this.parentElement && (this.marshal.trackValue(this.parentElement, "layout").pipe(In(this.destroySubject)).subscribe(this.onLayoutChange.bind(this)), this.marshal.trackValue(this.nativeElement, "layout-align").pipe(In(this.destroySubject)).subscribe(this.triggerReflow.bind(this)))
						}
						onLayoutChange(e) {
							const i = e.value.split(" ");
							this.direction = i[0], this.wrap = void 0 !== i[1] && "wrap" === i[1], this.triggerUpdate()
						}
						updateWithValue(e) {
							void 0 === this.direction && (this.direction = this.getFlexFlowDirection(this.parentElement, !1 !== this.layoutConfig.addFlexToParent)), void 0 === this.wrap && (this.wrap = this.hasWrap(this.parentElement));
							const i = this.direction,
								s = i.startsWith("row"),
								o = this.wrap;
							s && o ? this.styleCache = F$ : s && !o ? this.styleCache = I$ : !s && o ? this.styleCache = R$ : !s && !o && (this.styleCache = T$);
							const l = oM(String(e).replace(";", ""), this.flexGrow, this.flexShrink);
							this.addStyles(l.join(" "), {
								direction: i,
								hasWrap: o
							})
						}
						triggerReflow() {
							const e = this.activatedValue;
							if (void 0 !== e) {
								const r = oM(e + "", this.flexGrow, this.flexShrink);
								this.marshal.updateElement(this.nativeElement, this.DIRECTIVE_KEY, r.join(" "))
							}
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(U), p(xe), p(Sn), p(M$), p(Ae))
					}, t.\u0275dir = x({
						type: t,
						inputs: {
							shrink: ["fxShrink", "shrink"],
							grow: ["fxGrow", "grow"]
						},
						features: [M]
					}), t
				})(),
				ug = (() => {
					class t extends S$ {
						constructor() {
							super(...arguments), this.inputs = A$
						}
					}
					return t.\u0275fac = function() {
						let n;
						return function(r) {
							return (n || (n = k(t)))(r || t)
						}
					}(), t.\u0275dir = x({
						type: t,
						selectors: [
							["", "fxFlex", ""],
							["", "fxFlex.xs", ""],
							["", "fxFlex.sm", ""],
							["", "fxFlex.md", ""],
							["", "fxFlex.lg", ""],
							["", "fxFlex.xl", ""],
							["", "fxFlex.lt-sm", ""],
							["", "fxFlex.lt-md", ""],
							["", "fxFlex.lt-lg", ""],
							["", "fxFlex.lt-xl", ""],
							["", "fxFlex.gt-xs", ""],
							["", "fxFlex.gt-sm", ""],
							["", "fxFlex.gt-md", ""],
							["", "fxFlex.gt-lg", ""]
						],
						inputs: {
							fxFlex: "fxFlex",
							"fxFlex.xs": "fxFlex.xs",
							"fxFlex.sm": "fxFlex.sm",
							"fxFlex.md": "fxFlex.md",
							"fxFlex.lg": "fxFlex.lg",
							"fxFlex.xl": "fxFlex.xl",
							"fxFlex.lt-sm": "fxFlex.lt-sm",
							"fxFlex.lt-md": "fxFlex.lt-md",
							"fxFlex.lt-lg": "fxFlex.lt-lg",
							"fxFlex.lt-xl": "fxFlex.lt-xl",
							"fxFlex.gt-xs": "fxFlex.gt-xs",
							"fxFlex.gt-sm": "fxFlex.gt-sm",
							"fxFlex.gt-md": "fxFlex.gt-md",
							"fxFlex.gt-lg": "fxFlex.gt-lg"
						},
						features: [M]
					}), t
				})();
			const I$ = new Map,
				T$ = new Map,
				F$ = new Map,
				R$ = new Map,
				Z$ = {
					margin: 0,
					width: "100%",
					height: "100%",
					"min-width": "100%",
					"min-height": "100%"
				};
			let X$ = (() => {
					class t extends Pe {
						buildStyles(e) {
							return Z$
						}
					}
					return t.\u0275fac = function() {
						let n;
						return function(r) {
							return (n || (n = k(t)))(r || t)
						}
					}(), t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac,
						providedIn: "root"
					}), t
				})(),
				cg = (() => {
					class t extends Ie {
						constructor(e, r, i, s) {
							super(e, i, r, s), this.styleCache = J$, this.addStyles("")
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(U), p(xe), p(X$), p(Ae))
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["", "fxFill", ""],
							["", "fxFlexFill", ""]
						],
						features: [M]
					}), t
				})();
			const J$ = new Map;
			let eU = (() => {
				class t extends Pe {
					buildStyles(e, r) {
						const i = {},
							[s, o] = e.split(" ");
						switch (s) {
							case "center":
								i["justify-content"] = "center";
								break;
							case "space-around":
								i["justify-content"] = "space-around";
								break;
							case "space-between":
								i["justify-content"] = "space-between";
								break;
							case "space-evenly":
								i["justify-content"] = "space-evenly";
								break;
							case "end":
							case "flex-end":
								i["justify-content"] = "flex-end";
								break;
							default:
								i["justify-content"] = "flex-start"
						}
						switch (o) {
							case "start":
							case "flex-start":
								i["align-items"] = i["align-content"] = "flex-start";
								break;
							case "center":
								i["align-items"] = i["align-content"] = "center";
								break;
							case "end":
							case "flex-end":
								i["align-items"] = i["align-content"] = "flex-end";
								break;
							case "space-between":
								i["align-content"] = "space-between", i["align-items"] = "stretch";
								break;
							case "space-around":
								i["align-content"] = "space-around", i["align-items"] = "stretch";
								break;
							case "baseline":
								i["align-content"] = "stretch", i["align-items"] = "baseline";
								break;
							default:
								i["align-items"] = i["align-content"] = "stretch"
						}
						return mr(i, {
							display: r.inline ? "inline-flex" : "flex",
							"flex-direction": r.layout,
							"box-sizing": "border-box",
							"max-width": "stretch" === o ? oa(r.layout) ? null : "100%" : null,
							"max-height": "stretch" === o && oa(r.layout) ? "100%" : null
						})
					}
				}
				return t.\u0275fac = function() {
					let n;
					return function(r) {
						return (n || (n = k(t)))(r || t)
					}
				}(), t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const tU = ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"];
			let nU = (() => {
					class t extends Ie {
						constructor(e, r, i, s) {
							super(e, i, r, s), this.DIRECTIVE_KEY = "layout-align", this.layout = "row", this.inline = !1, this.init(), this.marshal.trackValue(this.nativeElement, "layout").pipe(In(this.destroySubject)).subscribe(this.onLayoutChange.bind(this))
						}
						updateWithValue(e) {
							const r = this.layout || "row",
								i = this.inline;
							"row" === r && i ? this.styleCache = aU : "row" !== r || i ? "row-reverse" === r && i ? this.styleCache = uU : "row-reverse" !== r || i ? "column" === r && i ? this.styleCache = lU : "column" !== r || i ? "column-reverse" === r && i ? this.styleCache = cU : "column-reverse" === r && !i && (this.styleCache = oU) : this.styleCache = iU : this.styleCache = sU : this.styleCache = rU, this.addStyles(e, {
								layout: r,
								inline: i
							})
						}
						onLayoutChange(e) {
							const r = e.value.split(" ");
							this.layout = r[0], this.inline = e.value.includes("inline"), Wu.find(i => i === this.layout) || (this.layout = "row"), this.triggerUpdate()
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(U), p(xe), p(eU), p(Ae))
					}, t.\u0275dir = x({
						type: t,
						features: [M]
					}), t
				})(),
				dg = (() => {
					class t extends nU {
						constructor() {
							super(...arguments), this.inputs = tU
						}
					}
					return t.\u0275fac = function() {
						let n;
						return function(r) {
							return (n || (n = k(t)))(r || t)
						}
					}(), t.\u0275dir = x({
						type: t,
						selectors: [
							["", "fxLayoutAlign", ""],
							["", "fxLayoutAlign.xs", ""],
							["", "fxLayoutAlign.sm", ""],
							["", "fxLayoutAlign.md", ""],
							["", "fxLayoutAlign.lg", ""],
							["", "fxLayoutAlign.xl", ""],
							["", "fxLayoutAlign.lt-sm", ""],
							["", "fxLayoutAlign.lt-md", ""],
							["", "fxLayoutAlign.lt-lg", ""],
							["", "fxLayoutAlign.lt-xl", ""],
							["", "fxLayoutAlign.gt-xs", ""],
							["", "fxLayoutAlign.gt-sm", ""],
							["", "fxLayoutAlign.gt-md", ""],
							["", "fxLayoutAlign.gt-lg", ""]
						],
						inputs: {
							fxLayoutAlign: "fxLayoutAlign",
							"fxLayoutAlign.xs": "fxLayoutAlign.xs",
							"fxLayoutAlign.sm": "fxLayoutAlign.sm",
							"fxLayoutAlign.md": "fxLayoutAlign.md",
							"fxLayoutAlign.lg": "fxLayoutAlign.lg",
							"fxLayoutAlign.xl": "fxLayoutAlign.xl",
							"fxLayoutAlign.lt-sm": "fxLayoutAlign.lt-sm",
							"fxLayoutAlign.lt-md": "fxLayoutAlign.lt-md",
							"fxLayoutAlign.lt-lg": "fxLayoutAlign.lt-lg",
							"fxLayoutAlign.lt-xl": "fxLayoutAlign.lt-xl",
							"fxLayoutAlign.gt-xs": "fxLayoutAlign.gt-xs",
							"fxLayoutAlign.gt-sm": "fxLayoutAlign.gt-sm",
							"fxLayoutAlign.gt-md": "fxLayoutAlign.gt-md",
							"fxLayoutAlign.gt-lg": "fxLayoutAlign.gt-lg"
						},
						features: [M]
					}), t
				})();
			const rU = new Map,
				iU = new Map,
				sU = new Map,
				oU = new Map,
				aU = new Map,
				lU = new Map,
				uU = new Map,
				cU = new Map;
			let fg, hM = (() => {
				class t {}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275mod = de({
					type: t
				}), t.\u0275inj = ce({
					imports: [ig, ng]
				}), t
			})();
			try {
				fg = typeof Intl < "u" && Intl.v8BreakIterator
			} catch {
				fg = !1
			}
			let Ss, _r = (() => {
				class t {
					constructor(e) {
						this._platformId = e, this.isBrowser = this._platformId ? ui(this._platformId) : "object" == typeof document && !!document, this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent), this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent), this.BLINK = this.isBrowser && !(!window.chrome && !fg) && typeof CSS < "u" && !this.EDGE && !this.TRIDENT, this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT, this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window), this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent), this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT, this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(an))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const pM = ["color", "button", "checkbox", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];

			function gM() {
				if (Ss) return Ss;
				if ("object" != typeof document || !document) return Ss = new Set(pM), Ss;
				let t = document.createElement("input");
				return Ss = new Set(pM.filter(n => (t.setAttribute("type", n), t.type === n))), Ss
			}
			let la, hg;

			function Qu(t) {
				return function dU() {
					if (null == la && typeof window < "u") try {
						window.addEventListener("test", null, Object.defineProperty({}, "passive", {
							get: () => la = !0
						}))
					} finally {
						la = la || !1
					}
					return la
				}() ? t : !!t.capture
			}

			function ua(t) {
				return t.composedPath ? t.composedPath()[0] : t.target
			}

			function mM(t) {
				return Gt((n, e) => t <= e)
			}

			function wU(t, n) {
				return t === n
			}

			function ft(t) {
				return null != t && "false" != `${t}`
			}

			function yM(t) {
				return Array.isArray(t) ? t : [t]
			}

			function jr(t) {
				return t instanceof U ? t.nativeElement : t
			}
			class xU extends Et {
				constructor(n, e) {
					super()
				}
				schedule(n, e = 0) {
					return this
				}
			}
			const Zu = {
					setInterval(t, n, ...e) {
						const {
							delegate: r
						} = Zu;
						return r?.setInterval ? r.setInterval(t, n, ...e) : setInterval(t, n, ...e)
					},
					clearInterval(t) {
						const {
							delegate: n
						} = Zu;
						return (n?.clearInterval || clearInterval)(t)
					},
					delegate: void 0
				},
				pg = {
					now: () => (pg.delegate || Date).now(),
					delegate: void 0
				};
			class ca {
				constructor(n, e = ca.now) {
					this.schedulerActionCtor = n, this.now = e
				}
				schedule(n, e = 0, r) {
					return new this.schedulerActionCtor(this, n).schedule(r, e)
				}
			}
			ca.now = pg.now;
			const AU = new class MU extends ca {
				constructor(n, e = ca.now) {
					super(n, e), this.actions = [], this._active = !1
				}
				flush(n) {
					const {
						actions: e
					} = this;
					if (this._active) return void e.push(n);
					let r;
					this._active = !0;
					do {
						if (r = n.execute(n.state, n.delay)) break
					} while (n = e.shift());
					if (this._active = !1, r) {
						for (; n = e.shift();) n.unsubscribe();
						throw r
					}
				}
			}(class EU extends xU {
				constructor(n, e) {
					super(n, e), this.scheduler = n, this.work = e, this.pending = !1
				}
				schedule(n, e = 0) {
					var r;
					if (this.closed) return this;
					this.state = n;
					const i = this.id,
						s = this.scheduler;
					return null != i && (this.id = this.recycleAsyncId(s, i, e)), this.pending = !0, this.delay = e, this.id = null !== (r = this.id) && void 0 !== r ? r : this.requestAsyncId(s, this.id, e), this
				}
				requestAsyncId(n, e, r = 0) {
					return Zu.setInterval(n.flush.bind(n, this), r)
				}
				recycleAsyncId(n, e, r = 0) {
					if (null != r && this.delay === r && !1 === this.pending) return e;
					null != e && Zu.clearInterval(e)
				}
				execute(n, e) {
					if (this.closed) return new Error("executing a cancelled action");
					this.pending = !1;
					const r = this._execute(n, e);
					if (r) return r;
					!1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
				}
				_execute(n, e) {
					let i, r = !1;
					try {
						this.work(n)
					} catch (s) {
						r = !0, i = s || new Error("Scheduled action threw falsy error")
					}
					if (r) return this.unsubscribe(), i
				}
				unsubscribe() {
					if (!this.closed) {
						const {
							id: n,
							scheduler: e
						} = this, {
							actions: r
						} = e;
						this.work = this.state = this.scheduler = null, this.pending = !1, xi(r, this), null != n && (this.id = this.recycleAsyncId(e, n, null)), this.delay = null, super.unsubscribe()
					}
				}
			});

			function _M(t, n = AU) {
				return Ve((e, r) => {
					let i = null,
						s = null,
						o = null;
					const a = () => {
						if (i) {
							i.unsubscribe(), i = null;
							const u = s;
							s = null, r.next(u)
						}
					};

					function l() {
						const u = o + t,
							c = n.now();
						if (c < u) return i = this.schedule(void 0, u - c), void r.add(i);
						a()
					}
					e.subscribe(Oe(r, u => {
						s = u, o = n.now(), i || (i = n.schedule(l, t), r.add(i))
					}, () => {
						a(), r.complete()
					}, void 0, () => {
						s = i = null
					}))
				})
			}
			const vM = new Set;
			let Is, SU = (() => {
				class t {
					constructor(e) {
						this._platform = e, this._matchMedia = this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : TU
					}
					matchMedia(e) {
						return (this._platform.WEBKIT || this._platform.BLINK) && function IU(t) {
							if (!vM.has(t)) try {
								Is || (Is = document.createElement("style"), Is.setAttribute("type", "text/css"), document.head.appendChild(Is)), Is.sheet && (Is.sheet.insertRule(`@media ${t} {body{ }}`, 0), vM.add(t))
							} catch (n) {
								console.error(n)
							}
						}(e), this._matchMedia(e)
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(_r))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();

			function TU(t) {
				return {
					matches: "all" === t || "" === t,
					media: t,
					addListener: () => {},
					removeListener: () => {}
				}
			}
			let FU = (() => {
				class t {
					constructor(e, r) {
						this._mediaMatcher = e, this._zone = r, this._queries = new Map, this._destroySubject = new Re
					}
					ngOnDestroy() {
						this._destroySubject.next(), this._destroySubject.complete()
					}
					isMatched(e) {
						return bM(yM(e)).some(i => this._registerQuery(i).mql.matches)
					}
					observe(e) {
						let s = Cp(bM(yM(e)).map(o => this._registerQuery(o).observable));
						return s = Du(s.pipe(Vr(1)), s.pipe(mM(1), _M(0))), s.pipe(j(o => {
							const a = {
								matches: !1,
								breakpoints: {}
							};
							return o.forEach(({
								matches: l,
								query: u
							}) => {
								a.matches = a.matches || l, a.breakpoints[u] = l
							}), a
						}))
					}
					_registerQuery(e) {
						if (this._queries.has(e)) return this._queries.get(e);
						const r = this._mediaMatcher.matchMedia(e),
							s = {
								observable: new Ce(o => {
									const a = l => this._zone.run(() => o.next(l));
									return r.addListener(a), () => {
										r.removeListener(a)
									}
								}).pipe(Wo(r), j(({
									matches: o
								}) => ({
									query: e,
									matches: o
								})), In(this._destroySubject)),
								mql: r
							};
						return this._queries.set(e, s), s
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(SU), b(se))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();

			function bM(t) {
				return t.map(n => n.split(",")).reduce((n, e) => n.concat(e)).map(n => n.trim())
			}

			function xM(t) {
				return 0 === t.buttons || 0 === t.offsetX && 0 === t.offsetY
			}

			function EM(t) {
				const n = t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0];
				return !(!n || -1 !== n.identifier || null != n.radiusX && 1 !== n.radiusX || null != n.radiusY && 1 !== n.radiusY)
			}
			const BU = new S("cdk-input-modality-detector-options"),
				HU = {
					ignoreKeys: [18, 17, 224, 91, 16]
				},
				Ts = Qu({
					passive: !0,
					capture: !0
				});
			let jU = (() => {
				class t {
					constructor(e, r, i, s) {
						this._platform = e, this._mostRecentTarget = null, this._modality = new qt(null), this._lastTouchMs = 0, this._onKeydown = o => {
							this._options?.ignoreKeys?.some(a => a === o.keyCode) || (this._modality.next("keyboard"), this._mostRecentTarget = ua(o))
						}, this._onMousedown = o => {
							Date.now() - this._lastTouchMs < 650 || (this._modality.next(xM(o) ? "keyboard" : "mouse"), this._mostRecentTarget = ua(o))
						}, this._onTouchstart = o => {
							EM(o) ? this._modality.next("keyboard") : (this._lastTouchMs = Date.now(), this._modality.next("touch"), this._mostRecentTarget = ua(o))
						}, this._options = {
							...HU,
							...s
						}, this.modalityDetected = this._modality.pipe(mM(1)), this.modalityChanged = this.modalityDetected.pipe(function bU(t, n = br) {
							return t = t ?? wU, Ve((e, r) => {
								let i, s = !0;
								e.subscribe(Oe(r, o => {
									const a = n(o);
									(s || !t(i, a)) && (s = !1, i = a, r.next(o))
								}))
							})
						}()), e.isBrowser && r.runOutsideAngular(() => {
							i.addEventListener("keydown", this._onKeydown, Ts), i.addEventListener("mousedown", this._onMousedown, Ts), i.addEventListener("touchstart", this._onTouchstart, Ts)
						})
					}
					get mostRecentModality() {
						return this._modality.value
					}
					ngOnDestroy() {
						this._modality.complete(), this._platform.isBrowser && (document.removeEventListener("keydown", this._onKeydown, Ts), document.removeEventListener("mousedown", this._onMousedown, Ts), document.removeEventListener("touchstart", this._onTouchstart, Ts))
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(_r), b(se), b(oe), b(BU, 8))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const UU = new S("cdk-focus-monitor-default-options"),
				Xu = Qu({
					passive: !0,
					capture: !0
				});
			let GU = (() => {
				class t {
					constructor(e, r, i, s, o) {
						this._ngZone = e, this._platform = r, this._inputModalityDetector = i, this._origin = null, this._windowFocused = !1, this._originFromTouchInteraction = !1, this._elementInfo = new Map, this._monitoredElementCount = 0, this._rootNodeFocusListenerCount = new Map, this._windowFocusListener = () => {
							this._windowFocused = !0, this._windowFocusTimeoutId = window.setTimeout(() => this._windowFocused = !1)
						}, this._stopInputModalityDetector = new Re, this._rootNodeFocusAndBlurListener = a => {
							for (let u = ua(a); u; u = u.parentElement) "focus" === a.type ? this._onFocus(a, u) : this._onBlur(a, u)
						}, this._document = s, this._detectionMode = o?.detectionMode || 0
					}
					monitor(e, r = !1) {
						const i = jr(e);
						if (!this._platform.isBrowser || 1 !== i.nodeType) return O(null);
						const s = function hU(t) {
								if (function fU() {
										if (null == hg) {
											const t = typeof document < "u" ? document.head : null;
											hg = !(!t || !t.createShadowRoot && !t.attachShadow)
										}
										return hg
									}()) {
									const n = t.getRootNode ? t.getRootNode() : null;
									if (typeof ShadowRoot < "u" && ShadowRoot && n instanceof ShadowRoot) return n
								}
								return null
							}(i) || this._getDocument(),
							o = this._elementInfo.get(i);
						if (o) return r && (o.checkChildren = !0), o.subject;
						const a = {
							checkChildren: r,
							subject: new Re,
							rootNode: s
						};
						return this._elementInfo.set(i, a), this._registerGlobalListeners(a), a.subject
					}
					stopMonitoring(e) {
						const r = jr(e),
							i = this._elementInfo.get(r);
						i && (i.subject.complete(), this._setClasses(r), this._elementInfo.delete(r), this._removeGlobalListeners(i))
					}
					focusVia(e, r, i) {
						const s = jr(e);
						s === this._getDocument().activeElement ? this._getClosestElementsInfo(s).forEach(([a, l]) => this._originChanged(a, r, l)) : (this._setOrigin(r), "function" == typeof s.focus && s.focus(i))
					}
					ngOnDestroy() {
						this._elementInfo.forEach((e, r) => this.stopMonitoring(r))
					}
					_getDocument() {
						return this._document || document
					}
					_getWindow() {
						return this._getDocument().defaultView || window
					}
					_getFocusOrigin(e) {
						return this._origin ? this._originFromTouchInteraction ? this._shouldBeAttributedToTouch(e) ? "touch" : "program" : this._origin : this._windowFocused && this._lastFocusOrigin ? this._lastFocusOrigin : e && this._isLastInteractionFromInputLabel(e) ? "mouse" : "program"
					}
					_shouldBeAttributedToTouch(e) {
						return 1 === this._detectionMode || !!e?.contains(this._inputModalityDetector._mostRecentTarget)
					}
					_setClasses(e, r) {
						e.classList.toggle("cdk-focused", !!r), e.classList.toggle("cdk-touch-focused", "touch" === r), e.classList.toggle("cdk-keyboard-focused", "keyboard" === r), e.classList.toggle("cdk-mouse-focused", "mouse" === r), e.classList.toggle("cdk-program-focused", "program" === r)
					}
					_setOrigin(e, r = !1) {
						this._ngZone.runOutsideAngular(() => {
							this._origin = e, this._originFromTouchInteraction = "touch" === e && r, 0 === this._detectionMode && (clearTimeout(this._originTimeoutId), this._originTimeoutId = setTimeout(() => this._origin = null, this._originFromTouchInteraction ? 650 : 1))
						})
					}
					_onFocus(e, r) {
						const i = this._elementInfo.get(r),
							s = ua(e);
						!i || !i.checkChildren && r !== s || this._originChanged(r, this._getFocusOrigin(s), i)
					}
					_onBlur(e, r) {
						const i = this._elementInfo.get(r);
						!i || i.checkChildren && e.relatedTarget instanceof Node && r.contains(e.relatedTarget) || (this._setClasses(r), this._emitOrigin(i, null))
					}
					_emitOrigin(e, r) {
						e.subject.observers.length && this._ngZone.run(() => e.subject.next(r))
					}
					_registerGlobalListeners(e) {
						if (!this._platform.isBrowser) return;
						const r = e.rootNode,
							i = this._rootNodeFocusListenerCount.get(r) || 0;
						i || this._ngZone.runOutsideAngular(() => {
							r.addEventListener("focus", this._rootNodeFocusAndBlurListener, Xu), r.addEventListener("blur", this._rootNodeFocusAndBlurListener, Xu)
						}), this._rootNodeFocusListenerCount.set(r, i + 1), 1 == ++this._monitoredElementCount && (this._ngZone.runOutsideAngular(() => {
							this._getWindow().addEventListener("focus", this._windowFocusListener)
						}), this._inputModalityDetector.modalityDetected.pipe(In(this._stopInputModalityDetector)).subscribe(s => {
							this._setOrigin(s, !0)
						}))
					}
					_removeGlobalListeners(e) {
						const r = e.rootNode;
						if (this._rootNodeFocusListenerCount.has(r)) {
							const i = this._rootNodeFocusListenerCount.get(r);
							i > 1 ? this._rootNodeFocusListenerCount.set(r, i - 1) : (r.removeEventListener("focus", this._rootNodeFocusAndBlurListener, Xu), r.removeEventListener("blur", this._rootNodeFocusAndBlurListener, Xu), this._rootNodeFocusListenerCount.delete(r))
						}--this._monitoredElementCount || (this._getWindow().removeEventListener("focus", this._windowFocusListener), this._stopInputModalityDetector.next(), clearTimeout(this._windowFocusTimeoutId), clearTimeout(this._originTimeoutId))
					}
					_originChanged(e, r, i) {
						this._setClasses(e, r), this._emitOrigin(i, r), this._lastFocusOrigin = r
					}
					_getClosestElementsInfo(e) {
						const r = [];
						return this._elementInfo.forEach((i, s) => {
							(s === e || i.checkChildren && s.contains(e)) && r.push([s, i])
						}), r
					}
					_isLastInteractionFromInputLabel(e) {
						const {
							_mostRecentTarget: r,
							mostRecentModality: i
						} = this._inputModalityDetector;
						if ("mouse" !== i || !r || r === e || "INPUT" !== e.nodeName && "TEXTAREA" !== e.nodeName || e.disabled) return !1;
						const s = e.labels;
						if (s)
							for (let o = 0; o < s.length; o++)
								if (s[o].contains(r)) return !0;
						return !1
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(se), b(_r), b(jU), b(oe, 8), b(UU, 8))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const AM = "cdk-high-contrast-black-on-white",
				SM = "cdk-high-contrast-white-on-black",
				gg = "cdk-high-contrast-active";
			let zU = (() => {
				class t {
					constructor(e, r) {
						this._platform = e, this._document = r, this._breakpointSubscription = ge(FU).observe("(forced-colors: active)").subscribe(() => {
							this._hasCheckedHighContrastMode && (this._hasCheckedHighContrastMode = !1, this._applyBodyHighContrastModeCssClasses())
						})
					}
					getHighContrastMode() {
						if (!this._platform.isBrowser) return 0;
						const e = this._document.createElement("div");
						e.style.backgroundColor = "rgb(1,2,3)", e.style.position = "absolute", this._document.body.appendChild(e);
						const r = this._document.defaultView || window,
							i = r && r.getComputedStyle ? r.getComputedStyle(e) : null,
							s = (i && i.backgroundColor || "").replace(/ /g, "");
						switch (e.remove(), s) {
							case "rgb(0,0,0)":
							case "rgb(45,50,54)":
							case "rgb(32,32,32)":
								return 2;
							case "rgb(255,255,255)":
							case "rgb(255,250,239)":
								return 1
						}
						return 0
					}
					ngOnDestroy() {
						this._breakpointSubscription.unsubscribe()
					}
					_applyBodyHighContrastModeCssClasses() {
						if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
							const e = this._document.body.classList;
							e.remove(gg, AM, SM), this._hasCheckedHighContrastMode = !0;
							const r = this.getHighContrastMode();
							1 === r ? e.add(gg, AM) : 2 === r && e.add(gg, SM)
						}
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(_r), b(oe))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const qU = new S("mat-sanity-checks", {
				providedIn: "root",
				factory: function WU() {
					return !0
				}
			});
			let Kt = (() => {
				class t {
					constructor(e, r, i) {
						this._sanityChecks = r, this._document = i, this._hasDoneGlobalChecks = !1, e._applyBodyHighContrastModeCssClasses(), this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0)
					}
					_checkIsEnabled(e) {
						return ! function pU() {
							return typeof __karma__ < "u" && !!__karma__ || typeof jasmine < "u" && !!jasmine || typeof jest < "u" && !!jest || typeof Mocha < "u" && !!Mocha
						}() && ("boolean" == typeof this._sanityChecks ? this._sanityChecks : !!this._sanityChecks[e])
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(zU), b(qU, 8), b(oe))
				}, t.\u0275mod = de({
					type: t
				}), t.\u0275inj = ce({
					imports: [ng, ng]
				}), t
			})();

			function KU(t) {
				return class extends t {
					constructor(...n) {
						super(...n), this._disabled = !1
					}
					get disabled() {
						return this._disabled
					}
					set disabled(n) {
						this._disabled = ft(n)
					}
				}
			}

			function Ju(t, n) {
				return class extends t {
					constructor(...e) {
						super(...e), this.defaultColor = n, this.color = n
					}
					get color() {
						return this._color
					}
					set color(e) {
						const r = e || this.defaultColor;
						r !== this._color && (this._color && this._elementRef.nativeElement.classList.remove(`mat-${this._color}`), r && this._elementRef.nativeElement.classList.add(`mat-${r}`), this._color = r)
					}
				}
			}

			function QU(t) {
				return class extends t {
					constructor(...n) {
						super(...n), this._disableRipple = !1
					}
					get disableRipple() {
						return this._disableRipple
					}
					set disableRipple(n) {
						this._disableRipple = ft(n)
					}
				}
			}

			function YU(t) {
				return class extends t {
					constructor(...n) {
						super(...n), this.errorState = !1
					}
					updateErrorState() {
						const n = this.errorState,
							s = (this.errorStateMatcher || this._defaultErrorStateMatcher).isErrorState(this.ngControl ? this.ngControl.control : null, this._parentFormGroup || this._parentForm);
						s !== n && (this.errorState = s, this.stateChanges.next())
					}
				}
			}
			let FM = (() => {
				class t {
					isErrorState(e, r) {
						return !!(e && e.invalid && (e.touched || r && r.submitted))
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			class XU {
				constructor(n, e, r, i = !1) {
					this._renderer = n, this.element = e, this.config = r, this._animationForciblyDisabledThroughCss = i, this.state = 3
				}
				fadeOut() {
					this._renderer.fadeOutRipple(this)
				}
			}
			const RM = {
					enterDuration: 225,
					exitDuration: 150
				},
				mg = Qu({
					passive: !0
				}),
				OM = ["mousedown", "touchstart"],
				kM = ["mouseup", "mouseleave", "touchend", "touchcancel"];
			class eG {
				constructor(n, e, r, i) {
					this._target = n, this._ngZone = e, this._isPointerDown = !1, this._activeRipples = new Map, this._pointerUpEventsRegistered = !1, i.isBrowser && (this._containerElement = jr(r))
				}
				fadeInRipple(n, e, r = {}) {
					const i = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect(),
						s = {
							...RM,
							...r.animation
						};
					r.centered && (n = i.left + i.width / 2, e = i.top + i.height / 2);
					const o = r.radius || function tG(t, n, e) {
							const r = Math.max(Math.abs(t - e.left), Math.abs(t - e.right)),
								i = Math.max(Math.abs(n - e.top), Math.abs(n - e.bottom));
							return Math.sqrt(r * r + i * i)
						}(n, e, i),
						a = n - i.left,
						l = e - i.top,
						u = s.enterDuration,
						c = document.createElement("div");
					c.classList.add("mat-ripple-element"), c.style.left = a - o + "px", c.style.top = l - o + "px", c.style.height = 2 * o + "px", c.style.width = 2 * o + "px", null != r.color && (c.style.backgroundColor = r.color), c.style.transitionDuration = `${u}ms`, this._containerElement.appendChild(c);
					const d = window.getComputedStyle(c),
						h = d.transitionDuration,
						g = "none" === d.transitionProperty || "0s" === h || "0s, 0s" === h,
						m = new XU(this, c, r, g);
					c.style.transform = "scale3d(1, 1, 1)", m.state = 0, r.persistent || (this._mostRecentTransientRipple = m);
					let _ = null;
					return !g && (u || s.exitDuration) && this._ngZone.runOutsideAngular(() => {
						const y = () => this._finishRippleTransition(m),
							C = () => this._destroyRipple(m);
						c.addEventListener("transitionend", y), c.addEventListener("transitioncancel", C), _ = {
							onTransitionEnd: y,
							onTransitionCancel: C
						}
					}), this._activeRipples.set(m, _), (g || !u) && this._finishRippleTransition(m), m
				}
				fadeOutRipple(n) {
					if (2 === n.state || 3 === n.state) return;
					const e = n.element,
						r = {
							...RM,
							...n.config.animation
						};
					e.style.transitionDuration = `${r.exitDuration}ms`, e.style.opacity = "0", n.state = 2, (n._animationForciblyDisabledThroughCss || !r.exitDuration) && this._finishRippleTransition(n)
				}
				fadeOutAll() {
					this._getActiveRipples().forEach(n => n.fadeOut())
				}
				fadeOutAllNonPersistent() {
					this._getActiveRipples().forEach(n => {
						n.config.persistent || n.fadeOut()
					})
				}
				setupTriggerEvents(n) {
					const e = jr(n);
					!e || e === this._triggerElement || (this._removeTriggerEvents(), this._triggerElement = e, this._registerEvents(OM))
				}
				handleEvent(n) {
					"mousedown" === n.type ? this._onMousedown(n) : "touchstart" === n.type ? this._onTouchStart(n) : this._onPointerUp(), this._pointerUpEventsRegistered || (this._registerEvents(kM), this._pointerUpEventsRegistered = !0)
				}
				_finishRippleTransition(n) {
					0 === n.state ? this._startFadeOutTransition(n) : 2 === n.state && this._destroyRipple(n)
				}
				_startFadeOutTransition(n) {
					const e = n === this._mostRecentTransientRipple,
						{
							persistent: r
						} = n.config;
					n.state = 1, !r && (!e || !this._isPointerDown) && n.fadeOut()
				}
				_destroyRipple(n) {
					const e = this._activeRipples.get(n) ?? null;
					this._activeRipples.delete(n), this._activeRipples.size || (this._containerRect = null), n === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null), n.state = 3, null !== e && (n.element.removeEventListener("transitionend", e.onTransitionEnd), n.element.removeEventListener("transitioncancel", e.onTransitionCancel)), n.element.remove()
				}
				_onMousedown(n) {
					const e = xM(n),
						r = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
					!this._target.rippleDisabled && !e && !r && (this._isPointerDown = !0, this.fadeInRipple(n.clientX, n.clientY, this._target.rippleConfig))
				}
				_onTouchStart(n) {
					if (!this._target.rippleDisabled && !EM(n)) {
						this._lastTouchStartEvent = Date.now(), this._isPointerDown = !0;
						const e = n.changedTouches;
						for (let r = 0; r < e.length; r++) this.fadeInRipple(e[r].clientX, e[r].clientY, this._target.rippleConfig)
					}
				}
				_onPointerUp() {
					!this._isPointerDown || (this._isPointerDown = !1, this._getActiveRipples().forEach(n => {
						!n.config.persistent && (1 === n.state || n.config.terminateOnPointerUp && 0 === n.state) && n.fadeOut()
					}))
				}
				_registerEvents(n) {
					this._ngZone.runOutsideAngular(() => {
						n.forEach(e => {
							this._triggerElement.addEventListener(e, this, mg)
						})
					})
				}
				_getActiveRipples() {
					return Array.from(this._activeRipples.keys())
				}
				_removeTriggerEvents() {
					this._triggerElement && (OM.forEach(n => {
						this._triggerElement.removeEventListener(n, this, mg)
					}), this._pointerUpEventsRegistered && kM.forEach(n => {
						this._triggerElement.removeEventListener(n, this, mg)
					}))
				}
			}
			const nG = new S("mat-ripple-global-options");
			let NM = (() => {
					class t {
						constructor(e, r, i, s, o) {
							this._elementRef = e, this._animationMode = o, this.radius = 0, this._disabled = !1, this._isInitialized = !1, this._globalOptions = s || {}, this._rippleRenderer = new eG(this, r, e, i)
						}
						get disabled() {
							return this._disabled
						}
						set disabled(e) {
							e && this.fadeOutAllNonPersistent(), this._disabled = e, this._setupTriggerEventsIfEnabled()
						}
						get trigger() {
							return this._trigger || this._elementRef.nativeElement
						}
						set trigger(e) {
							this._trigger = e, this._setupTriggerEventsIfEnabled()
						}
						ngOnInit() {
							this._isInitialized = !0, this._setupTriggerEventsIfEnabled()
						}
						ngOnDestroy() {
							this._rippleRenderer._removeTriggerEvents()
						}
						fadeOutAll() {
							this._rippleRenderer.fadeOutAll()
						}
						fadeOutAllNonPersistent() {
							this._rippleRenderer.fadeOutAllNonPersistent()
						}
						get rippleConfig() {
							return {
								centered: this.centered,
								radius: this.radius,
								color: this.color,
								animation: {
									...this._globalOptions.animation,
									..."NoopAnimations" === this._animationMode ? {
										enterDuration: 0,
										exitDuration: 0
									} : {},
									...this.animation
								},
								terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
							}
						}
						get rippleDisabled() {
							return this.disabled || !!this._globalOptions.disabled
						}
						_setupTriggerEventsIfEnabled() {
							!this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger)
						}
						launch(e, r = 0, i) {
							return "number" == typeof e ? this._rippleRenderer.fadeInRipple(e, r, {
								...this.rippleConfig,
								...i
							}) : this._rippleRenderer.fadeInRipple(0, 0, {
								...this.rippleConfig,
								...e
							})
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(U), p(se), p(_r), p(nG, 8), p(ps, 8))
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["", "mat-ripple", ""],
							["", "matRipple", ""]
						],
						hostAttrs: [1, "mat-ripple"],
						hostVars: 2,
						hostBindings: function(e, r) {
							2 & e && Ft("mat-ripple-unbounded", r.unbounded)
						},
						inputs: {
							color: ["matRippleColor", "color"],
							unbounded: ["matRippleUnbounded", "unbounded"],
							centered: ["matRippleCentered", "centered"],
							radius: ["matRippleRadius", "radius"],
							animation: ["matRippleAnimation", "animation"],
							disabled: ["matRippleDisabled", "disabled"],
							trigger: ["matRippleTrigger", "trigger"]
						},
						exportAs: ["matRipple"]
					}), t
				})(),
				rG = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [Kt, Kt]
					}), t
				})();
			const iG = ["*", [
					["mat-card-footer"]
				]],
				sG = ["*", "mat-card-footer"];
			let LM = (() => {
					class t {
						constructor(e) {
							this._animationMode = e
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(ps, 8))
					}, t.\u0275cmp = en({
						type: t,
						selectors: [
							["mat-card"]
						],
						hostAttrs: [1, "mat-card", "mat-focus-indicator"],
						hostVars: 2,
						hostBindings: function(e, r) {
							2 & e && Ft("_mat-animation-noopable", "NoopAnimations" === r._animationMode)
						},
						exportAs: ["matCard"],
						ngContentSelectors: sG,
						decls: 2,
						vars: 0,
						template: function(e, r) {
							1 & e && (ls(iG), wt(0), wt(1, 1))
						},
						styles: [".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}.mat-card._mat-animation-noopable{transition:none !important;animation:none !important}.mat-card>.mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card>.mat-divider-horizontal{left:auto;right:0}.mat-card>.mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card>.mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px;display:block;overflow:hidden}.mat-card-image img{width:100%}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions:not(.mat-card-actions-align-end) .mat-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-raised-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-actions-align-end .mat-button:last-child,.mat-card-actions-align-end .mat-raised-button:last-child,.mat-card-actions-align-end .mat-stroked-button:last-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}"],
						encapsulation: 2,
						changeDetection: 0
					}), t
				})(),
				oG = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [Kt, Kt]
					}), t
				})();
			class aG extends Re {
				constructor(n = 1 / 0, e = 1 / 0, r = pg) {
					super(), this._bufferSize = n, this._windowTime = e, this._timestampProvider = r, this._buffer = [], this._infiniteTimeWindow = !0, this._infiniteTimeWindow = e === 1 / 0, this._bufferSize = Math.max(1, n), this._windowTime = Math.max(1, e)
				}
				next(n) {
					const {
						isStopped: e,
						_buffer: r,
						_infiniteTimeWindow: i,
						_timestampProvider: s,
						_windowTime: o
					} = this;
					e || (r.push(n), !i && r.push(s.now() + o)), this._trimBuffer(), super.next(n)
				}
				_subscribe(n) {
					this._throwIfClosed(), this._trimBuffer();
					const e = this._innerSubscribe(n),
						{
							_infiniteTimeWindow: r,
							_buffer: i
						} = this,
						s = i.slice();
					for (let o = 0; o < s.length && !n.closed; o += r ? 1 : 2) n.next(s[o]);
					return this._checkFinalizedStatuses(n), e
				}
				_trimBuffer() {
					const {
						_bufferSize: n,
						_timestampProvider: e,
						_buffer: r,
						_infiniteTimeWindow: i
					} = this, s = (i ? 1 : 2) * n;
					if (n < 1 / 0 && s < r.length && r.splice(0, r.length - s), !i) {
						const o = e.now();
						let a = 0;
						for (let l = 1; l < r.length && r[l] <= o; l += 2) a = l;
						a && r.splice(0, a + 1)
					}
				}
			}
			var fa = (() => {
				return (t = fa || (fa = {})).LOGGED_IN = "LOGGED_IN", t.LOGGED_OUT = "LOGGED_OUT", fa;
				var t
			})();
			let ec = (() => {
				class t {
					constructor(e) {
						this.http = e, this.authStateSubject = new aG(1), this.ACCESS_TOKEN_STORAGE_KEY = "access_token"
					}
					authenticate(e) {
						return this.http.post("https://admin.pwnme.org/api/v1/authenticate", e).pipe(je(r => {
							this.saveSessionModel(r)
						}))
					}
					getAuthState$() {
						return this.authStateSubject.asObservable()
					}
					isLoggedIn() {
						return !!this.getSessionModelFromSessionStorage().acceessToken
					}
					logout() {
						sessionStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY), this.authStateSubject.next(fa.LOGGED_OUT)
					}
					getSessionModelFromSessionStorage() {
						return {
							acceessToken: sessionStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY)
						}
					}
					saveSessionModel(e) {
						sessionStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, e.token), this.authStateSubject.next(fa.LOGGED_IN)
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(Ho))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();
			const lG = ["mat-button", ""],
				uG = ["*"],
				dG = ["mat-button", "mat-flat-button", "mat-icon-button", "mat-raised-button", "mat-stroked-button", "mat-mini-fab", "mat-fab"],
				fG = Ju(KU(QU(class {
					constructor(t) {
						this._elementRef = t
					}
				})));
			let PM = (() => {
					class t extends fG {
						constructor(e, r, i) {
							super(e), this._focusMonitor = r, this._animationMode = i, this.isRoundButton = this._hasHostAttributes("mat-fab", "mat-mini-fab"), this.isIconButton = this._hasHostAttributes("mat-icon-button");
							for (const s of dG) this._hasHostAttributes(s) && this._getHostElement().classList.add(s);
							e.nativeElement.classList.add("mat-button-base"), this.isRoundButton && (this.color = "accent")
						}
						ngAfterViewInit() {
							this._focusMonitor.monitor(this._elementRef, !0)
						}
						ngOnDestroy() {
							this._focusMonitor.stopMonitoring(this._elementRef)
						}
						focus(e, r) {
							e ? this._focusMonitor.focusVia(this._getHostElement(), e, r) : this._getHostElement().focus(r)
						}
						_getHostElement() {
							return this._elementRef.nativeElement
						}
						_isRippleDisabled() {
							return this.disableRipple || this.disabled
						}
						_hasHostAttributes(...e) {
							return e.some(r => this._getHostElement().hasAttribute(r))
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(U), p(GU), p(ps, 8))
					}, t.\u0275cmp = en({
						type: t,
						selectors: [
							["button", "mat-button", ""],
							["button", "mat-raised-button", ""],
							["button", "mat-icon-button", ""],
							["button", "mat-fab", ""],
							["button", "mat-mini-fab", ""],
							["button", "mat-stroked-button", ""],
							["button", "mat-flat-button", ""]
						],
						viewQuery: function(e, r) {
							if (1 & e && si(NM, 5), 2 & e) {
								let i;
								Je(i = et()) && (r.ripple = i.first)
							}
						},
						hostAttrs: [1, "mat-focus-indicator"],
						hostVars: 5,
						hostBindings: function(e, r) {
							2 & e && (Tt("disabled", r.disabled || null), Ft("_mat-animation-noopable", "NoopAnimations" === r._animationMode)("mat-button-disabled", r.disabled))
						},
						inputs: {
							disabled: "disabled",
							disableRipple: "disableRipple",
							color: "color"
						},
						exportAs: ["matButton"],
						features: [M],
						attrs: lG,
						ngContentSelectors: uG,
						decls: 4,
						vars: 5,
						consts: [
							[1, "mat-button-wrapper"],
							["matRipple", "", 1, "mat-button-ripple", 3, "matRippleDisabled", "matRippleCentered", "matRippleTrigger"],
							[1, "mat-button-focus-overlay"]
						],
						template: function(e, r) {
							1 & e && (ls(), me(0, "span", 0), wt(1), De(), bt(2, "span", 1)(3, "span", 2)), 2 & e && (Ye(2), Ft("mat-button-ripple-round", r.isRoundButton || r.isIconButton), Be("matRippleDisabled", r._isRippleDisabled())("matRippleCentered", r.isIconButton)("matRippleTrigger", r._getHostElement()))
						},
						dependencies: [NM],
						styles: [".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}.mat-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.mat-flat-button::before,.mat-raised-button::before,.mat-fab::before,.mat-mini-fab::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-stroked-button::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1)}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}"],
						encapsulation: 2,
						changeDetection: 0
					}), t
				})(),
				hG = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [rG, Kt, Kt]
					}), t
				})();
			const pG = ["*", [
					["mat-toolbar-row"]
				]],
				gG = ["*", "mat-toolbar-row"],
				mG = Ju(class {
					constructor(t) {
						this._elementRef = t
					}
				});
			let yG = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["mat-toolbar-row"]
						],
						hostAttrs: [1, "mat-toolbar-row"],
						exportAs: ["matToolbarRow"]
					}), t
				})(),
				_G = (() => {
					class t extends mG {
						constructor(e, r, i) {
							super(e), this._platform = r, this._document = i
						}
						ngAfterViewInit() {
							this._platform.isBrowser && (this._checkToolbarMixedModes(), this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes()))
						}
						_checkToolbarMixedModes() {}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(U), p(_r), p(oe))
					}, t.\u0275cmp = en({
						type: t,
						selectors: [
							["mat-toolbar"]
						],
						contentQueries: function(e, r, i) {
							if (1 & e && Ut(i, yG, 5), 2 & e) {
								let s;
								Je(s = et()) && (r._toolbarRows = s)
							}
						},
						hostAttrs: [1, "mat-toolbar"],
						hostVars: 4,
						hostBindings: function(e, r) {
							2 & e && Ft("mat-toolbar-multiple-rows", r._toolbarRows.length > 0)("mat-toolbar-single-row", 0 === r._toolbarRows.length)
						},
						inputs: {
							color: "color"
						},
						exportAs: ["matToolbar"],
						features: [M],
						ngContentSelectors: gG,
						decls: 2,
						vars: 0,
						template: function(e, r) {
							1 & e && (ls(pG), wt(0), wt(1, 1))
						},
						styles: [".cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}"],
						encapsulation: 2,
						changeDetection: 0
					}), t
				})(),
				vG = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [Kt, Kt]
					}), t
				})();
			const bG = ["*"];
			let tc;

			function ha(t) {
				return function wG() {
					if (void 0 === tc && (tc = null, typeof window < "u")) {
						const t = window;
						void 0 !== t.trustedTypes && (tc = t.trustedTypes.createPolicy("angular#components", {
							createHTML: n => n
						}))
					}
					return tc
				}()?.createHTML(t) || t
			}

			function VM(t) {
				return Error(`Unable to find icon with the name "${t}"`)
			}

			function BM(t) {
				return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)
			}

			function HM(t) {
				return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)
			}
			class Ci {
				constructor(n, e, r) {
					this.url = n, this.svgText = e, this.options = r
				}
			}
			let nc = (() => {
				class t {
					constructor(e, r, i, s) {
						this._httpClient = e, this._sanitizer = r, this._errorHandler = s, this._svgIconConfigs = new Map, this._iconSetConfigs = new Map, this._cachedIconsByUrl = new Map, this._inProgressUrlFetches = new Map, this._fontCssClassesByAlias = new Map, this._resolvers = [], this._defaultFontSetClass = ["material-icons", "mat-ligature-font"], this._document = i
					}
					addSvgIcon(e, r, i) {
						return this.addSvgIconInNamespace("", e, r, i)
					}
					addSvgIconLiteral(e, r, i) {
						return this.addSvgIconLiteralInNamespace("", e, r, i)
					}
					addSvgIconInNamespace(e, r, i, s) {
						return this._addSvgIconConfig(e, r, new Ci(i, null, s))
					}
					addSvgIconResolver(e) {
						return this._resolvers.push(e), this
					}
					addSvgIconLiteralInNamespace(e, r, i, s) {
						const o = this._sanitizer.sanitize(ie.HTML, i);
						if (!o) throw HM(i);
						const a = ha(o);
						return this._addSvgIconConfig(e, r, new Ci("", a, s))
					}
					addSvgIconSet(e, r) {
						return this.addSvgIconSetInNamespace("", e, r)
					}
					addSvgIconSetLiteral(e, r) {
						return this.addSvgIconSetLiteralInNamespace("", e, r)
					}
					addSvgIconSetInNamespace(e, r, i) {
						return this._addSvgIconSetConfig(e, new Ci(r, null, i))
					}
					addSvgIconSetLiteralInNamespace(e, r, i) {
						const s = this._sanitizer.sanitize(ie.HTML, r);
						if (!s) throw HM(r);
						const o = ha(s);
						return this._addSvgIconSetConfig(e, new Ci("", o, i))
					}
					registerFontClassAlias(e, r = e) {
						return this._fontCssClassesByAlias.set(e, r), this
					}
					classNameForFontAlias(e) {
						return this._fontCssClassesByAlias.get(e) || e
					}
					setDefaultFontSetClass(...e) {
						return this._defaultFontSetClass = e, this
					}
					getDefaultFontSetClass() {
						return this._defaultFontSetClass
					}
					getSvgIconFromUrl(e) {
						const r = this._sanitizer.sanitize(ie.RESOURCE_URL, e);
						if (!r) throw BM(e);
						const i = this._cachedIconsByUrl.get(r);
						return i ? O(rc(i)) : this._loadSvgIconFromConfig(new Ci(e, null)).pipe(je(s => this._cachedIconsByUrl.set(r, s)), j(s => rc(s)))
					}
					getNamedSvgIcon(e, r = "") {
						const i = jM(r, e);
						let s = this._svgIconConfigs.get(i);
						if (s) return this._getSvgFromConfig(s);
						if (s = this._getIconConfigFromResolvers(r, e), s) return this._svgIconConfigs.set(i, s), this._getSvgFromConfig(s);
						const o = this._iconSetConfigs.get(r);
						return o ? this._getSvgFromIconSetConfigs(e, o) : _s(VM(i))
					}
					ngOnDestroy() {
						this._resolvers = [], this._svgIconConfigs.clear(), this._iconSetConfigs.clear(), this._cachedIconsByUrl.clear()
					}
					_getSvgFromConfig(e) {
						return e.svgText ? O(rc(this._svgElementFromConfig(e))) : this._loadSvgIconFromConfig(e).pipe(j(r => rc(r)))
					}
					_getSvgFromIconSetConfigs(e, r) {
						const i = this._extractIconWithNameFromAnySet(e, r);
						return i ? O(i) : AC(r.filter(o => !o.svgText).map(o => this._loadSvgIconSetFromConfig(o).pipe(hr(a => {
							const u = `Loading icon set URL: ${this._sanitizer.sanitize(ie.RESOURCE_URL,o.url)} failed: ${a.message}`;
							return this._errorHandler.handleError(new Error(u)), O(null)
						})))).pipe(j(() => {
							const o = this._extractIconWithNameFromAnySet(e, r);
							if (!o) throw VM(e);
							return o
						}))
					}
					_extractIconWithNameFromAnySet(e, r) {
						for (let i = r.length - 1; i >= 0; i--) {
							const s = r[i];
							if (s.svgText && s.svgText.toString().indexOf(e) > -1) {
								const o = this._svgElementFromConfig(s),
									a = this._extractSvgIconFromSet(o, e, s.options);
								if (a) return a
							}
						}
						return null
					}
					_loadSvgIconFromConfig(e) {
						return this._fetchIcon(e).pipe(je(r => e.svgText = r), j(() => this._svgElementFromConfig(e)))
					}
					_loadSvgIconSetFromConfig(e) {
						return e.svgText ? O(null) : this._fetchIcon(e).pipe(je(r => e.svgText = r))
					}
					_extractSvgIconFromSet(e, r, i) {
						const s = e.querySelector(`[id="${r}"]`);
						if (!s) return null;
						const o = s.cloneNode(!0);
						if (o.removeAttribute("id"), "svg" === o.nodeName.toLowerCase()) return this._setSvgAttributes(o, i);
						if ("symbol" === o.nodeName.toLowerCase()) return this._setSvgAttributes(this._toSvgElement(o), i);
						const a = this._svgElementFromString(ha("<svg></svg>"));
						return a.appendChild(o), this._setSvgAttributes(a, i)
					}
					_svgElementFromString(e) {
						const r = this._document.createElement("DIV");
						r.innerHTML = e;
						const i = r.querySelector("svg");
						if (!i) throw Error("<svg> tag not found");
						return i
					}
					_toSvgElement(e) {
						const r = this._svgElementFromString(ha("<svg></svg>")),
							i = e.attributes;
						for (let s = 0; s < i.length; s++) {
							const {
								name: o,
								value: a
							} = i[s];
							"id" !== o && r.setAttribute(o, a)
						}
						for (let s = 0; s < e.childNodes.length; s++) e.childNodes[s].nodeType === this._document.ELEMENT_NODE && r.appendChild(e.childNodes[s].cloneNode(!0));
						return r
					}
					_setSvgAttributes(e, r) {
						return e.setAttribute("fit", ""), e.setAttribute("height", "100%"), e.setAttribute("width", "100%"), e.setAttribute("preserveAspectRatio", "xMidYMid meet"), e.setAttribute("focusable", "false"), r && r.viewBox && e.setAttribute("viewBox", r.viewBox), e
					}
					_fetchIcon(e) {
						const {
							url: r,
							options: i
						} = e, s = i?.withCredentials ?? !1;
						if (!this._httpClient) throw function CG() {
							return Error("Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.")
						}();
						if (null == r) throw Error(`Cannot fetch icon from URL "${r}".`);
						const o = this._sanitizer.sanitize(ie.RESOURCE_URL, r);
						if (!o) throw BM(r);
						const a = this._inProgressUrlFetches.get(o);
						if (a) return a;
						const l = this._httpClient.get(o, {
							responseType: "text",
							withCredentials: s
						}).pipe(j(u => ha(u)), Eu(() => this._inProgressUrlFetches.delete(o)), Wg());
						return this._inProgressUrlFetches.set(o, l), l
					}
					_addSvgIconConfig(e, r, i) {
						return this._svgIconConfigs.set(jM(e, r), i), this
					}
					_addSvgIconSetConfig(e, r) {
						const i = this._iconSetConfigs.get(e);
						return i ? i.push(r) : this._iconSetConfigs.set(e, [r]), this
					}
					_svgElementFromConfig(e) {
						if (!e.svgElement) {
							const r = this._svgElementFromString(e.svgText);
							this._setSvgAttributes(r, e.options), e.svgElement = r
						}
						return e.svgElement
					}
					_getIconConfigFromResolvers(e, r) {
						for (let i = 0; i < this._resolvers.length; i++) {
							const s = this._resolvers[i](r, e);
							if (s) return xG(s) ? new Ci(s.url, null, s.options) : new Ci(s, null)
						}
					}
				}
				return t.\u0275fac = function(e) {
					return new(e || t)(b(Ho, 8), b(Wl), b(oe, 8), b(er))
				}, t.\u0275prov = E({
					token: t,
					factory: t.\u0275fac,
					providedIn: "root"
				}), t
			})();

			function rc(t) {
				return t.cloneNode(!0)
			}

			function jM(t, n) {
				return t + ":" + n
			}

			function xG(t) {
				return !(!t.url || !t.options)
			}
			const EG = Ju(class {
					constructor(t) {
						this._elementRef = t
					}
				}),
				MG = new S("MAT_ICON_DEFAULT_OPTIONS"),
				AG = new S("mat-icon-location", {
					providedIn: "root",
					factory: function SG() {
						const t = ge(oe),
							n = t ? t.location : null;
						return {
							getPathname: () => n ? n.pathname + n.search : ""
						}
					}
				}),
				$M = ["clip-path", "color-profile", "src", "cursor", "fill", "filter", "marker", "marker-start", "marker-mid", "marker-end", "mask", "stroke"],
				IG = $M.map(t => `[${t}]`).join(", "),
				TG = /^url\(['"]?#(.*?)['"]?\)$/;
			let FG = (() => {
					class t extends EG {
						constructor(e, r, i, s, o, a) {
							super(e), this._iconRegistry = r, this._location = s, this._errorHandler = o, this._inline = !1, this._previousFontSetClass = [], this._currentIconFetch = Et.EMPTY, a && (a.color && (this.color = this.defaultColor = a.color), a.fontSet && (this.fontSet = a.fontSet)), i || e.nativeElement.setAttribute("aria-hidden", "true")
						}
						get inline() {
							return this._inline
						}
						set inline(e) {
							this._inline = ft(e)
						}
						get svgIcon() {
							return this._svgIcon
						}
						set svgIcon(e) {
							e !== this._svgIcon && (e ? this._updateSvgIcon(e) : this._svgIcon && this._clearSvgElement(), this._svgIcon = e)
						}
						get fontSet() {
							return this._fontSet
						}
						set fontSet(e) {
							const r = this._cleanupFontValue(e);
							r !== this._fontSet && (this._fontSet = r, this._updateFontIconClasses())
						}
						get fontIcon() {
							return this._fontIcon
						}
						set fontIcon(e) {
							const r = this._cleanupFontValue(e);
							r !== this._fontIcon && (this._fontIcon = r, this._updateFontIconClasses())
						}
						_splitIconName(e) {
							if (!e) return ["", ""];
							const r = e.split(":");
							switch (r.length) {
								case 1:
									return ["", r[0]];
								case 2:
									return r;
								default:
									throw Error(`Invalid icon name: "${e}"`)
							}
						}
						ngOnInit() {
							this._updateFontIconClasses()
						}
						ngAfterViewChecked() {
							const e = this._elementsWithExternalReferences;
							if (e && e.size) {
								const r = this._location.getPathname();
								r !== this._previousPath && (this._previousPath = r, this._prependPathToReferences(r))
							}
						}
						ngOnDestroy() {
							this._currentIconFetch.unsubscribe(), this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear()
						}
						_usingFontIcon() {
							return !this.svgIcon
						}
						_setSvgElement(e) {
							this._clearSvgElement();
							const r = this._location.getPathname();
							this._previousPath = r, this._cacheChildrenWithExternalReferences(e), this._prependPathToReferences(r), this._elementRef.nativeElement.appendChild(e)
						}
						_clearSvgElement() {
							const e = this._elementRef.nativeElement;
							let r = e.childNodes.length;
							for (this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear(); r--;) {
								const i = e.childNodes[r];
								(1 !== i.nodeType || "svg" === i.nodeName.toLowerCase()) && i.remove()
							}
						}
						_updateFontIconClasses() {
							if (!this._usingFontIcon()) return;
							const e = this._elementRef.nativeElement,
								r = (this.fontSet ? this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/) : this._iconRegistry.getDefaultFontSetClass()).filter(i => i.length > 0);
							this._previousFontSetClass.forEach(i => e.classList.remove(i)), r.forEach(i => e.classList.add(i)), this._previousFontSetClass = r, this.fontIcon !== this._previousFontIconClass && !r.includes("mat-ligature-font") && (this._previousFontIconClass && e.classList.remove(this._previousFontIconClass), this.fontIcon && e.classList.add(this.fontIcon), this._previousFontIconClass = this.fontIcon)
						}
						_cleanupFontValue(e) {
							return "string" == typeof e ? e.trim().split(" ")[0] : e
						}
						_prependPathToReferences(e) {
							const r = this._elementsWithExternalReferences;
							r && r.forEach((i, s) => {
								i.forEach(o => {
									s.setAttribute(o.name, `url('${e}#${o.value}')`)
								})
							})
						}
						_cacheChildrenWithExternalReferences(e) {
							const r = e.querySelectorAll(IG),
								i = this._elementsWithExternalReferences = this._elementsWithExternalReferences || new Map;
							for (let s = 0; s < r.length; s++) $M.forEach(o => {
								const a = r[s],
									l = a.getAttribute(o),
									u = l ? l.match(TG) : null;
								if (u) {
									let c = i.get(a);
									c || (c = [], i.set(a, c)), c.push({
										name: o,
										value: u[1]
									})
								}
							})
						}
						_updateSvgIcon(e) {
							if (this._svgNamespace = null, this._svgName = null, this._currentIconFetch.unsubscribe(), e) {
								const [r, i] = this._splitIconName(e);
								r && (this._svgNamespace = r), i && (this._svgName = i), this._currentIconFetch = this._iconRegistry.getNamedSvgIcon(i, r).pipe(Vr(1)).subscribe(s => this._setSvgElement(s), s => {
									this._errorHandler.handleError(new Error(`Error retrieving icon ${r}:${i}! ${s.message}`))
								})
							}
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(U), p(nc), Li("aria-hidden"), p(AG), p(er), p(MG, 8))
					}, t.\u0275cmp = en({
						type: t,
						selectors: [
							["mat-icon"]
						],
						hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
						hostVars: 8,
						hostBindings: function(e, r) {
							2 & e && (Tt("data-mat-icon-type", r._usingFontIcon() ? "font" : "svg")("data-mat-icon-name", r._svgName || r.fontIcon)("data-mat-icon-namespace", r._svgNamespace || r.fontSet)("fontIcon", r._usingFontIcon() ? r.fontIcon : null), Ft("mat-icon-inline", r.inline)("mat-icon-no-color", "primary" !== r.color && "accent" !== r.color && "warn" !== r.color))
						},
						inputs: {
							color: "color",
							inline: "inline",
							svgIcon: "svgIcon",
							fontSet: "fontSet",
							fontIcon: "fontIcon"
						},
						exportAs: ["matIcon"],
						features: [M],
						ngContentSelectors: bG,
						decls: 1,
						vars: 0,
						template: function(e, r) {
							1 & e && (ls(), wt(0))
						},
						styles: [".mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}"],
						encapsulation: 2,
						changeDetection: 0
					}), t
				})(),
				RG = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [Kt, Kt]
					}), t
				})(),
				OG = (() => {
					class t {
						constructor(e, r) {
							this.router = e, this.authService = r
						}
						handleClickLogout() {
							this.authService.logout(), this.router.navigate(["/login"])
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(qe), p(ec))
					}, t.\u0275cmp = en({
						type: t,
						selectors: [
							["app-navbar"]
						],
						decls: 6,
						vars: 0,
						consts: [
							["src", "assets/img/admin.png", 1, "navbar-img"],
							[1, "spacer"],
							[1, "nav-box"],
							["mat-flat-button", "", "color", "accent", 3, "click"],
							["fontIcon", "logout"]
						],
						template: function(e, r) {
							1 & e && (me(0, "mat-toolbar"), bt(1, "img", 0)(2, "span", 1), me(3, "div", 2)(4, "button", 3), Ze("click", function() {
								return r.handleClickLogout()
							}), bt(5, "mat-icon", 4), De()()())
						},
						dependencies: [PM, _G, FG],
						styles: [".navbar-img[_ngcontent-%COMP%]{height:40px}@media (max-width: 480px){.navbar-img[_ngcontent-%COMP%]{display:none}}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}.nav-box[_ngcontent-%COMP%]{margin:5px}"]
					}), t
				})(),
				kG = (() => {
					class t {
						constructor(e) {
							this.flagService = e, this.FLAG_DEFAULT = "XXXX-{XXXXXX}", this.flag = this.FLAG_DEFAULT
						}
						ngOnInit() {
							this.flagService.getFlag().subscribe({
								next: e => {
									this.flag = e.flag
								},
								error: () => {
									this.flag = this.FLAG_DEFAULT
								}
							})
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(N2))
					}, t.\u0275cmp = en({
						type: t,
						selectors: [
							["app-dashboard"]
						],
						decls: 5,
						vars: 1,
						consts: [
							["fxLayoutAlign", "center center", "fxFlexFill", "", 1, "flag-box"],
							["fxFlex", "25", "fxFlex.md", "50", "fxFlex.sm", "50", "fxFlex.xs", "90"]
						],
						template: function(e, r) {
							1 & e && (bt(0, "app-navbar"), me(1, "div", 0)(2, "mat-card", 1)(3, "h1"), ni(4), De()()()), 2 & e && (Ye(4), pl("FLAG: ", r.flag, ""))
						},
						dependencies: [dg, cg, ug, LM, OG]
					}), t
				})(),
				UM = (() => {
					class t {
						create(e) {
							return typeof MutationObserver > "u" ? null : new MutationObserver(e)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac,
						providedIn: "root"
					}), t
				})(),
				NG = (() => {
					class t {
						constructor(e) {
							this._mutationObserverFactory = e, this._observedElements = new Map
						}
						ngOnDestroy() {
							this._observedElements.forEach((e, r) => this._cleanupObserver(r))
						}
						observe(e) {
							const r = jr(e);
							return new Ce(i => {
								const o = this._observeElement(r).subscribe(i);
								return () => {
									o.unsubscribe(), this._unobserveElement(r)
								}
							})
						}
						_observeElement(e) {
							if (this._observedElements.has(e)) this._observedElements.get(e).count++;
							else {
								const r = new Re,
									i = this._mutationObserverFactory.create(s => r.next(s));
								i && i.observe(e, {
									characterData: !0,
									childList: !0,
									subtree: !0
								}), this._observedElements.set(e, {
									observer: i,
									stream: r,
									count: 1
								})
							}
							return this._observedElements.get(e).stream
						}
						_unobserveElement(e) {
							this._observedElements.has(e) && (this._observedElements.get(e).count--, this._observedElements.get(e).count || this._cleanupObserver(e))
						}
						_cleanupObserver(e) {
							if (this._observedElements.has(e)) {
								const {
									observer: r,
									stream: i
								} = this._observedElements.get(e);
								r && r.disconnect(), i.complete(), this._observedElements.delete(e)
							}
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(UM))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac,
						providedIn: "root"
					}), t
				})(),
				LG = (() => {
					class t {
						constructor(e, r, i) {
							this._contentObserver = e, this._elementRef = r, this._ngZone = i, this.event = new Me, this._disabled = !1, this._currentSubscription = null
						}
						get disabled() {
							return this._disabled
						}
						set disabled(e) {
							this._disabled = ft(e), this._disabled ? this._unsubscribe() : this._subscribe()
						}
						get debounce() {
							return this._debounce
						}
						set debounce(e) {
							this._debounce = function CU(t, n = 0) {
								return function DU(t) {
									return !isNaN(parseFloat(t)) && !isNaN(Number(t))
								}(t) ? Number(t) : n
							}(e), this._subscribe()
						}
						ngAfterContentInit() {
							!this._currentSubscription && !this.disabled && this._subscribe()
						}
						ngOnDestroy() {
							this._unsubscribe()
						}
						_subscribe() {
							this._unsubscribe();
							const e = this._contentObserver.observe(this._elementRef);
							this._ngZone.runOutsideAngular(() => {
								this._currentSubscription = (this.debounce ? e.pipe(_M(this.debounce)) : e).subscribe(this.event)
							})
						}
						_unsubscribe() {
							this._currentSubscription?.unsubscribe()
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(NG), p(U), p(se))
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["", "cdkObserveContent", ""]
						],
						inputs: {
							disabled: ["cdkObserveContentDisabled", "disabled"],
							debounce: "debounce"
						},
						outputs: {
							event: "cdkObserveContent"
						},
						exportAs: ["cdkObserveContent"]
					}), t
				})(),
				PG = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						providers: [UM]
					}), t
				})();
			const VG = ["addListener", "removeListener"],
				BG = ["addEventListener", "removeEventListener"],
				HG = ["on", "off"];

			function yg(t, n, e, r) {
				if (ne(e) && (r = e, e = void 0), r) return yg(t, n, e).pipe(xh(r));
				const [i, s] = function UG(t) {
					return ne(t.addEventListener) && ne(t.removeEventListener)
				}(t) ? BG.map(o => a => t[o](n, a, e)): function jG(t) {
					return ne(t.addListener) && ne(t.removeListener)
				}(t) ? VG.map(GM(t, n)) : function $G(t) {
					return ne(t.on) && ne(t.off)
				}(t) ? HG.map(GM(t, n)) : [];
				if (!i && fc(t)) return nt(o => yg(o, n, e))(Ot(t));
				if (!i) throw new TypeError("Invalid event target");
				return new Ce(o => {
					const a = (...l) => o.next(1 < l.length ? l : l[0]);
					return i(a), () => s(a)
				})
			}

			function GM(t, n) {
				return e => r => t[e](n, r)
			}
			const GG = ["connectionContainer"],
				zG = ["inputContainer"],
				WG = ["label"];

			function qG(t, n) {
				1 & t && (ho(0), me(1, "div", 14), bt(2, "div", 15)(3, "div", 16)(4, "div", 17), De(), me(5, "div", 18), bt(6, "div", 15)(7, "div", 16)(8, "div", 17), De(), po())
			}

			function KG(t, n) {
				if (1 & t) {
					const e = hf();
					me(0, "div", 19), Ze("cdkObserveContent", function() {
						return Fc(e), Rc(Pn().updateOutlineGap())
					}), wt(1, 1), De()
				}
				2 & t && Be("cdkObserveContentDisabled", "outline" != Pn().appearance)
			}

			function QG(t, n) {
				if (1 & t && (ho(0), wt(1, 2), me(2, "span"), ni(3), De(), po()), 2 & t) {
					const e = Pn(2);
					Ye(3), hl(e._control.placeholder)
				}
			}

			function YG(t, n) {
				1 & t && wt(0, 3, ["*ngSwitchCase", "true"])
			}

			function ZG(t, n) {
				1 & t && (me(0, "span", 23), ni(1, " *"), De())
			}

			function XG(t, n) {
				if (1 & t) {
					const e = hf();
					me(0, "label", 20, 21), Ze("cdkObserveContent", function() {
						return Fc(e), Rc(Pn().updateOutlineGap())
					}), on(2, QG, 4, 1, "ng-container", 12), on(3, YG, 1, 0, "ng-content", 12), on(4, ZG, 2, 0, "span", 22), De()
				}
				if (2 & t) {
					const e = Pn();
					Ft("mat-empty", e._control.empty && !e._shouldAlwaysFloat())("mat-form-field-empty", e._control.empty && !e._shouldAlwaysFloat())("mat-accent", "accent" == e.color)("mat-warn", "warn" == e.color), Be("cdkObserveContentDisabled", "outline" != e.appearance)("id", e._labelId)("ngSwitch", e._hasLabel()), Tt("for", e._control.id)("aria-owns", e._control.id), Ye(2), Be("ngSwitchCase", !1), Ye(1), Be("ngSwitchCase", !0), Ye(1), Be("ngIf", !e.hideRequiredMarker && e._control.required && !e._control.disabled)
				}
			}

			function JG(t, n) {
				1 & t && (me(0, "div", 24), wt(1, 4), De())
			}

			function e3(t, n) {
				if (1 & t && (me(0, "div", 25), bt(1, "span", 26), De()), 2 & t) {
					const e = Pn();
					Ye(1), Ft("mat-accent", "accent" == e.color)("mat-warn", "warn" == e.color)
				}
			}

			function t3(t, n) {
				1 & t && (me(0, "div"), wt(1, 5), De()), 2 & t && Be("@transitionMessages", Pn()._subscriptAnimationState)
			}

			function n3(t, n) {
				if (1 & t && (me(0, "div", 30), ni(1), De()), 2 & t) {
					const e = Pn(2);
					Be("id", e._hintLabelId), Ye(1), hl(e.hintLabel)
				}
			}

			function r3(t, n) {
				if (1 & t && (me(0, "div", 27), on(1, n3, 2, 2, "div", 28), wt(2, 6), bt(3, "div", 29), wt(4, 7), De()), 2 & t) {
					const e = Pn();
					Be("@transitionMessages", e._subscriptAnimationState), Ye(1), Be("ngIf", e.hintLabel)
				}
			}
			const s3 = ["*", [
						["", "matPrefix", ""]
					],
					[
						["mat-placeholder"]
					],
					[
						["mat-label"]
					],
					[
						["", "matSuffix", ""]
					],
					[
						["mat-error"]
					],
					[
						["mat-hint", 3, "align", "end"]
					],
					[
						["mat-hint", "align", "end"]
					]
				],
				o3 = ["*", "[matPrefix]", "mat-placeholder", "mat-label", "[matSuffix]", "mat-error", "mat-hint:not([align='end'])", "mat-hint[align='end']"],
				a3 = new S("MatError"),
				l3 = {
					transitionMessages: uV("transitionMessages", [dV("enter", su({
						opacity: 1,
						transform: "translateY(0%)"
					})), fV("void => enter", [su({
						opacity: 0,
						transform: "translateY(-5px)"
					}), cV("300ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])
				};
			let _g = (() => {
				class t {}
				return t.\u0275fac = function(e) {
					return new(e || t)
				}, t.\u0275dir = x({
					type: t
				}), t
			})();
			const u3 = new S("MatHint");
			let zM = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["mat-label"]
						]
					}), t
				})(),
				c3 = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["mat-placeholder"]
						]
					}), t
				})();
			const d3 = new S("MatPrefix"),
				f3 = new S("MatSuffix");
			let WM = 0;
			const p3 = Ju(class {
					constructor(t) {
						this._elementRef = t
					}
				}, "primary"),
				g3 = new S("MAT_FORM_FIELD_DEFAULT_OPTIONS"),
				KM = new S("MatFormField");
			let m3 = (() => {
					class t extends p3 {
						constructor(e, r, i, s, o, a, l) {
							super(e), this._changeDetectorRef = r, this._dir = i, this._defaults = s, this._platform = o, this._ngZone = a, this._outlineGapCalculationNeededImmediately = !1, this._outlineGapCalculationNeededOnStable = !1, this._destroyed = new Re, this._hideRequiredMarker = !1, this._showAlwaysAnimate = !1, this._subscriptAnimationState = "", this._hintLabel = "", this._hintLabelId = "mat-hint-" + WM++, this._labelId = "mat-form-field-label-" + WM++, this.floatLabel = this._getDefaultFloatLabelState(), this._animationsEnabled = "NoopAnimations" !== l, this.appearance = s?.appearance || "legacy", s && (this._hideRequiredMarker = Boolean(s.hideRequiredMarker), s.color && (this.color = this.defaultColor = s.color))
						}
						get appearance() {
							return this._appearance
						}
						set appearance(e) {
							const r = this._appearance;
							this._appearance = e || this._defaults?.appearance || "legacy", "outline" === this._appearance && r !== e && (this._outlineGapCalculationNeededOnStable = !0)
						}
						get hideRequiredMarker() {
							return this._hideRequiredMarker
						}
						set hideRequiredMarker(e) {
							this._hideRequiredMarker = ft(e)
						}
						_shouldAlwaysFloat() {
							return "always" === this.floatLabel && !this._showAlwaysAnimate
						}
						_canLabelFloat() {
							return "never" !== this.floatLabel
						}
						get hintLabel() {
							return this._hintLabel
						}
						set hintLabel(e) {
							this._hintLabel = e, this._processHints()
						}
						get floatLabel() {
							return "legacy" !== this.appearance && "never" === this._floatLabel ? "auto" : this._floatLabel
						}
						set floatLabel(e) {
							e !== this._floatLabel && (this._floatLabel = e || this._getDefaultFloatLabelState(), this._changeDetectorRef.markForCheck())
						}
						get _control() {
							return this._explicitFormFieldControl || this._controlNonStatic || this._controlStatic
						}
						set _control(e) {
							this._explicitFormFieldControl = e
						}
						getLabelId() {
							return this._hasFloatingLabel() ? this._labelId : null
						}
						getConnectedOverlayOrigin() {
							return this._connectionContainerRef || this._elementRef
						}
						ngAfterContentInit() {
							this._validateControlChild();
							const e = this._control;
							e.controlType && this._elementRef.nativeElement.classList.add(`mat-form-field-type-${e.controlType}`), e.stateChanges.pipe(Wo(null)).subscribe(() => {
								this._validatePlaceholders(), this._syncDescribedByIds(), this._changeDetectorRef.markForCheck()
							}), e.ngControl && e.ngControl.valueChanges && e.ngControl.valueChanges.pipe(In(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck()), this._ngZone.runOutsideAngular(() => {
								this._ngZone.onStable.pipe(In(this._destroyed)).subscribe(() => {
									this._outlineGapCalculationNeededOnStable && this.updateOutlineGap()
								})
							}), _a(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
								this._outlineGapCalculationNeededOnStable = !0, this._changeDetectorRef.markForCheck()
							}), this._hintChildren.changes.pipe(Wo(null)).subscribe(() => {
								this._processHints(), this._changeDetectorRef.markForCheck()
							}), this._errorChildren.changes.pipe(Wo(null)).subscribe(() => {
								this._syncDescribedByIds(), this._changeDetectorRef.markForCheck()
							}), this._dir && this._dir.change.pipe(In(this._destroyed)).subscribe(() => {
								"function" == typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(() => {
									requestAnimationFrame(() => this.updateOutlineGap())
								}) : this.updateOutlineGap()
							})
						}
						ngAfterContentChecked() {
							this._validateControlChild(), this._outlineGapCalculationNeededImmediately && this.updateOutlineGap()
						}
						ngAfterViewInit() {
							this._subscriptAnimationState = "enter", this._changeDetectorRef.detectChanges()
						}
						ngOnDestroy() {
							this._destroyed.next(), this._destroyed.complete()
						}
						_shouldForward(e) {
							const r = this._control ? this._control.ngControl : null;
							return r && r[e]
						}
						_hasPlaceholder() {
							return !!(this._control && this._control.placeholder || this._placeholderChild)
						}
						_hasLabel() {
							return !(!this._labelChildNonStatic && !this._labelChildStatic)
						}
						_shouldLabelFloat() {
							return this._canLabelFloat() && (this._control && this._control.shouldLabelFloat || this._shouldAlwaysFloat())
						}
						_hideControlPlaceholder() {
							return "legacy" === this.appearance && !this._hasLabel() || this._hasLabel() && !this._shouldLabelFloat()
						}
						_hasFloatingLabel() {
							return this._hasLabel() || "legacy" === this.appearance && this._hasPlaceholder()
						}
						_getDisplayedMessages() {
							return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? "error" : "hint"
						}
						_animateAndLockLabel() {
							this._hasFloatingLabel() && this._canLabelFloat() && (this._animationsEnabled && this._label && (this._showAlwaysAnimate = !0, yg(this._label.nativeElement, "transitionend").pipe(Vr(1)).subscribe(() => {
								this._showAlwaysAnimate = !1
							})), this.floatLabel = "always", this._changeDetectorRef.markForCheck())
						}
						_validatePlaceholders() {}
						_processHints() {
							this._validateHints(), this._syncDescribedByIds()
						}
						_validateHints() {}
						_getDefaultFloatLabelState() {
							return this._defaults && this._defaults.floatLabel || "auto"
						}
						_syncDescribedByIds() {
							if (this._control) {
								let e = [];
								if (this._control.userAriaDescribedBy && "string" == typeof this._control.userAriaDescribedBy && e.push(...this._control.userAriaDescribedBy.split(" ")), "hint" === this._getDisplayedMessages()) {
									const r = this._hintChildren ? this._hintChildren.find(s => "start" === s.align) : null,
										i = this._hintChildren ? this._hintChildren.find(s => "end" === s.align) : null;
									r ? e.push(r.id) : this._hintLabel && e.push(this._hintLabelId), i && e.push(i.id)
								} else this._errorChildren && e.push(...this._errorChildren.map(r => r.id));
								this._control.setDescribedByIds(e)
							}
						}
						_validateControlChild() {}
						updateOutlineGap() {
							const e = this._label ? this._label.nativeElement : null,
								r = this._connectionContainerRef.nativeElement,
								i = ".mat-form-field-outline-start",
								s = ".mat-form-field-outline-gap";
							if ("outline" !== this.appearance || !this._platform.isBrowser) return;
							if (!e || !e.children.length || !e.textContent.trim()) {
								const c = r.querySelectorAll(`${i}, ${s}`);
								for (let d = 0; d < c.length; d++) c[d].style.width = "0";
								return
							}
							if (!this._isAttachedToDOM()) return void(this._outlineGapCalculationNeededImmediately = !0);
							let o = 0,
								a = 0;
							const l = r.querySelectorAll(i),
								u = r.querySelectorAll(s);
							if (this._label && this._label.nativeElement.children.length) {
								const c = r.getBoundingClientRect();
								if (0 === c.width && 0 === c.height) return this._outlineGapCalculationNeededOnStable = !0, void(this._outlineGapCalculationNeededImmediately = !1);
								const d = this._getStartEnd(c),
									f = e.children,
									h = this._getStartEnd(f[0].getBoundingClientRect());
								let g = 0;
								for (let m = 0; m < f.length; m++) g += f[m].offsetWidth;
								o = Math.abs(h - d) - 5, a = g > 0 ? .75 * g + 10 : 0
							}
							for (let c = 0; c < l.length; c++) l[c].style.width = `${o}px`;
							for (let c = 0; c < u.length; c++) u[c].style.width = `${a}px`;
							this._outlineGapCalculationNeededOnStable = this._outlineGapCalculationNeededImmediately = !1
						}
						_getStartEnd(e) {
							return this._dir && "rtl" === this._dir.value ? e.right : e.left
						}
						_isAttachedToDOM() {
							const e = this._elementRef.nativeElement;
							if (e.getRootNode) {
								const r = e.getRootNode();
								return r && r !== e
							}
							return document.documentElement.contains(e)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(U), p(Ao), p(tg, 8), p(g3, 8), p(_r), p(se), p(ps, 8))
					}, t.\u0275cmp = en({
						type: t,
						selectors: [
							["mat-form-field"]
						],
						contentQueries: function(e, r, i) {
							if (1 & e && (Ut(i, _g, 5), Ut(i, _g, 7), Ut(i, zM, 5), Ut(i, zM, 7), Ut(i, c3, 5), Ut(i, a3, 5), Ut(i, u3, 5), Ut(i, d3, 5), Ut(i, f3, 5)), 2 & e) {
								let s;
								Je(s = et()) && (r._controlNonStatic = s.first), Je(s = et()) && (r._controlStatic = s.first), Je(s = et()) && (r._labelChildNonStatic = s.first), Je(s = et()) && (r._labelChildStatic = s.first), Je(s = et()) && (r._placeholderChild = s.first), Je(s = et()) && (r._errorChildren = s), Je(s = et()) && (r._hintChildren = s), Je(s = et()) && (r._prefixChildren = s), Je(s = et()) && (r._suffixChildren = s)
							}
						},
						viewQuery: function(e, r) {
							if (1 & e && (si(GG, 7), si(zG, 5), si(WG, 5)), 2 & e) {
								let i;
								Je(i = et()) && (r._connectionContainerRef = i.first), Je(i = et()) && (r._inputContainerRef = i.first), Je(i = et()) && (r._label = i.first)
							}
						},
						hostAttrs: [1, "mat-form-field"],
						hostVars: 40,
						hostBindings: function(e, r) {
							2 & e && Ft("mat-form-field-appearance-standard", "standard" == r.appearance)("mat-form-field-appearance-fill", "fill" == r.appearance)("mat-form-field-appearance-outline", "outline" == r.appearance)("mat-form-field-appearance-legacy", "legacy" == r.appearance)("mat-form-field-invalid", r._control.errorState)("mat-form-field-can-float", r._canLabelFloat())("mat-form-field-should-float", r._shouldLabelFloat())("mat-form-field-has-label", r._hasFloatingLabel())("mat-form-field-hide-placeholder", r._hideControlPlaceholder())("mat-form-field-disabled", r._control.disabled)("mat-form-field-autofilled", r._control.autofilled)("mat-focused", r._control.focused)("ng-untouched", r._shouldForward("untouched"))("ng-touched", r._shouldForward("touched"))("ng-pristine", r._shouldForward("pristine"))("ng-dirty", r._shouldForward("dirty"))("ng-valid", r._shouldForward("valid"))("ng-invalid", r._shouldForward("invalid"))("ng-pending", r._shouldForward("pending"))("_mat-animation-noopable", !r._animationsEnabled)
						},
						inputs: {
							color: "color",
							appearance: "appearance",
							hideRequiredMarker: "hideRequiredMarker",
							hintLabel: "hintLabel",
							floatLabel: "floatLabel"
						},
						exportAs: ["matFormField"],
						features: [be([{
							provide: KM,
							useExisting: t
						}]), M],
						ngContentSelectors: o3,
						decls: 15,
						vars: 8,
						consts: [
							[1, "mat-form-field-wrapper"],
							[1, "mat-form-field-flex", 3, "click"],
							["connectionContainer", ""],
							[4, "ngIf"],
							["class", "mat-form-field-prefix", 3, "cdkObserveContentDisabled", "cdkObserveContent", 4, "ngIf"],
							[1, "mat-form-field-infix"],
							["inputContainer", ""],
							[1, "mat-form-field-label-wrapper"],
							["class", "mat-form-field-label", 3, "cdkObserveContentDisabled", "id", "mat-empty", "mat-form-field-empty", "mat-accent", "mat-warn", "ngSwitch", "cdkObserveContent", 4, "ngIf"],
							["class", "mat-form-field-suffix", 4, "ngIf"],
							["class", "mat-form-field-underline", 4, "ngIf"],
							[1, "mat-form-field-subscript-wrapper", 3, "ngSwitch"],
							[4, "ngSwitchCase"],
							["class", "mat-form-field-hint-wrapper", 4, "ngSwitchCase"],
							[1, "mat-form-field-outline"],
							[1, "mat-form-field-outline-start"],
							[1, "mat-form-field-outline-gap"],
							[1, "mat-form-field-outline-end"],
							[1, "mat-form-field-outline", "mat-form-field-outline-thick"],
							[1, "mat-form-field-prefix", 3, "cdkObserveContentDisabled", "cdkObserveContent"],
							[1, "mat-form-field-label", 3, "cdkObserveContentDisabled", "id", "ngSwitch", "cdkObserveContent"],
							["label", ""],
							["class", "mat-placeholder-required mat-form-field-required-marker", "aria-hidden", "true", 4, "ngIf"],
							["aria-hidden", "true", 1, "mat-placeholder-required", "mat-form-field-required-marker"],
							[1, "mat-form-field-suffix"],
							[1, "mat-form-field-underline"],
							[1, "mat-form-field-ripple"],
							[1, "mat-form-field-hint-wrapper"],
							["class", "mat-hint", 3, "id", 4, "ngIf"],
							[1, "mat-form-field-hint-spacer"],
							[1, "mat-hint", 3, "id"]
						],
						template: function(e, r) {
							1 & e && (ls(s3), me(0, "div", 0)(1, "div", 1, 2), Ze("click", function(s) {
								return r._control.onContainerClick && r._control.onContainerClick(s)
							}), on(3, qG, 9, 0, "ng-container", 3), on(4, KG, 2, 1, "div", 4), me(5, "div", 5, 6), wt(7), me(8, "span", 7), on(9, XG, 5, 16, "label", 8), De()(), on(10, JG, 2, 0, "div", 9), De(), on(11, e3, 2, 4, "div", 10), me(12, "div", 11), on(13, t3, 2, 1, "div", 12), on(14, r3, 5, 2, "div", 13), De()()), 2 & e && (Ye(3), Be("ngIf", "outline" == r.appearance), Ye(1), Be("ngIf", r._prefixChildren.length), Ye(5), Be("ngIf", r._hasFloatingLabel()), Ye(1), Be("ngIf", r._suffixChildren.length), Ye(1), Be("ngIf", "outline" != r.appearance), Ye(1), Be("ngSwitch", r._getDisplayedMessages()), Ye(1), Be("ngSwitchCase", "error"), Ye(1), Be("ngSwitchCase", "hint"))
						},
						dependencies: [qw, Bl, Qw, LG],
						styles: [".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}.cdk-high-contrast-active .mat-form-field-infix{border-image:linear-gradient(transparent, transparent)}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),width 400ms cubic-bezier(0.25, 0.8, 0.25, 1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.cdk-high-contrast-active .mat-form-field-disabled .mat-form-field-label{color:GrayText}.mat-form-field-empty.mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scale3d(1, 1.0001, 1)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(0.5);opacity:0;transition:background-color 300ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:none;transition:transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 300ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-subscript-wrapper .mat-icon,.mat-form-field-label-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field-hint-end{order:1}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none}", '.mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-form-field-flex{outline:dashed 3px}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:"";display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-ripple{height:0}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em}', '.mat-input-element{font:inherit;background:rgba(0,0,0,0);color:currentColor;border:none;outline:none;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit;box-sizing:content-box}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element:not([type=password])::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date],.mat-input-element[type=datetime],.mat-input-element[type=datetime-local],.mat-input-element[type=month],.mat-input-element[type=week],.mat-input-element[type=time]{line-height:1}.mat-input-element[type=date]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=month]::after,.mat-input-element[type=week]::after,.mat-input-element[type=time]::after{content:" ";white-space:pre;width:1px}.mat-input-element::-webkit-inner-spin-button,.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-moz-placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element::placeholder{opacity:0}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{opacity:0}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{opacity:0}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{opacity:0}._mat-animation-noopable .mat-input-element::placeholder{transition:none}._mat-animation-noopable .mat-input-element::-moz-placeholder{transition:none}._mat-animation-noopable .mat-input-element::-webkit-input-placeholder{transition:none}._mat-animation-noopable .mat-input-element:-ms-input-placeholder{transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px}', ".mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px)}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:rgba(0,0,0,0)}.cdk-high-contrast-active .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px;border-top-color:GrayText}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px}", ".mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-0.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-end{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:rgba(0,0,0,0)}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap{border-width:2px}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.cdk-high-contrast-active .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick{border:3px dashed}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.cdk-high-contrast-active .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline{color:GrayText}.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap{transition:none}", ".mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:rgba(0,0,0,0)}.cdk-high-contrast-active .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}"],
						encapsulation: 2,
						data: {
							animation: [l3.transitionMessages]
						},
						changeDetection: 0
					}), t
				})(),
				vg = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [Xw, Kt, PG, Kt]
					}), t
				})();
			const QM = Qu({
				passive: !0
			});
			let y3 = (() => {
					class t {
						constructor(e, r) {
							this._platform = e, this._ngZone = r, this._monitoredElements = new Map
						}
						monitor(e) {
							if (!this._platform.isBrowser) return Fn;
							const r = jr(e),
								i = this._monitoredElements.get(r);
							if (i) return i.subject;
							const s = new Re,
								o = "cdk-text-field-autofilled",
								a = l => {
									"cdk-text-field-autofill-start" !== l.animationName || r.classList.contains(o) ? "cdk-text-field-autofill-end" === l.animationName && r.classList.contains(o) && (r.classList.remove(o), this._ngZone.run(() => s.next({
										target: l.target,
										isAutofilled: !1
									}))) : (r.classList.add(o), this._ngZone.run(() => s.next({
										target: l.target,
										isAutofilled: !0
									})))
								};
							return this._ngZone.runOutsideAngular(() => {
								r.addEventListener("animationstart", a, QM), r.classList.add("cdk-text-field-autofill-monitored")
							}), this._monitoredElements.set(r, {
								subject: s,
								unlisten: () => {
									r.removeEventListener("animationstart", a, QM)
								}
							}), s
						}
						stopMonitoring(e) {
							const r = jr(e),
								i = this._monitoredElements.get(r);
							i && (i.unlisten(), i.subject.complete(), r.classList.remove("cdk-text-field-autofill-monitored"), r.classList.remove("cdk-text-field-autofilled"), this._monitoredElements.delete(r))
						}
						ngOnDestroy() {
							this._monitoredElements.forEach((e, r) => this.stopMonitoring(r))
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(_r), b(se))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac,
						providedIn: "root"
					}), t
				})(),
				YM = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({}), t
				})();
			const _3 = new S("MAT_INPUT_VALUE_ACCESSOR"),
				v3 = ["button", "checkbox", "file", "hidden", "image", "radio", "range", "reset", "submit"];
			let b3 = 0;
			const w3 = YU(class {
				constructor(t, n, e, r) {
					this._defaultErrorStateMatcher = t, this._parentForm = n, this._parentFormGroup = e, this.ngControl = r, this.stateChanges = new Re
				}
			});
			let C3 = (() => {
					class t extends w3 {
						constructor(e, r, i, s, o, a, l, u, c, d) {
							super(a, s, o, i), this._elementRef = e, this._platform = r, this._autofillMonitor = u, this._formField = d, this._uid = "mat-input-" + b3++, this.focused = !1, this.stateChanges = new Re, this.controlType = "mat-input", this.autofilled = !1, this._disabled = !1, this._type = "text", this._readonly = !1, this._neverEmptyInputTypes = ["date", "datetime", "datetime-local", "month", "time", "week"].filter(g => gM().has(g)), this._iOSKeyupListener = g => {
								const m = g.target;
								!m.value && 0 === m.selectionStart && 0 === m.selectionEnd && (m.setSelectionRange(1, 1), m.setSelectionRange(0, 0))
							};
							const f = this._elementRef.nativeElement,
								h = f.nodeName.toLowerCase();
							this._inputValueAccessor = l || f, this._previousNativeValue = this.value, this.id = this.id, r.IOS && c.runOutsideAngular(() => {
								e.nativeElement.addEventListener("keyup", this._iOSKeyupListener)
							}), this._isServer = !this._platform.isBrowser, this._isNativeSelect = "select" === h, this._isTextarea = "textarea" === h, this._isInFormField = !!d, this._isNativeSelect && (this.controlType = f.multiple ? "mat-native-select-multiple" : "mat-native-select")
						}
						get disabled() {
							return this.ngControl && null !== this.ngControl.disabled ? this.ngControl.disabled : this._disabled
						}
						set disabled(e) {
							this._disabled = ft(e), this.focused && (this.focused = !1, this.stateChanges.next())
						}
						get id() {
							return this._id
						}
						set id(e) {
							this._id = e || this._uid
						}
						get required() {
							return this._required ?? this.ngControl?.control?.hasValidator(eP.required) ?? !1
						}
						set required(e) {
							this._required = ft(e)
						}
						get type() {
							return this._type
						}
						set type(e) {
							this._type = e || "text", this._validateType(), !this._isTextarea && gM().has(this._type) && (this._elementRef.nativeElement.type = this._type)
						}
						get value() {
							return this._inputValueAccessor.value
						}
						set value(e) {
							e !== this.value && (this._inputValueAccessor.value = e, this.stateChanges.next())
						}
						get readonly() {
							return this._readonly
						}
						set readonly(e) {
							this._readonly = ft(e)
						}
						ngAfterViewInit() {
							this._platform.isBrowser && this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e => {
								this.autofilled = e.isAutofilled, this.stateChanges.next()
							})
						}
						ngOnChanges() {
							this.stateChanges.next()
						}
						ngOnDestroy() {
							this.stateChanges.complete(), this._platform.isBrowser && this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement), this._platform.IOS && this._elementRef.nativeElement.removeEventListener("keyup", this._iOSKeyupListener)
						}
						ngDoCheck() {
							this.ngControl && this.updateErrorState(), this._dirtyCheckNativeValue(), this._dirtyCheckPlaceholder()
						}
						focus(e) {
							this._elementRef.nativeElement.focus(e)
						}
						_focusChanged(e) {
							e !== this.focused && (this.focused = e, this.stateChanges.next())
						}
						_onInput() {}
						_dirtyCheckPlaceholder() {
							const e = this._formField,
								r = e && "legacy" === e.appearance && !e._hasLabel?.() ? null : this.placeholder;
							if (r !== this._previousPlaceholder) {
								const i = this._elementRef.nativeElement;
								this._previousPlaceholder = r, r ? i.setAttribute("placeholder", r) : i.removeAttribute("placeholder")
							}
						}
						_dirtyCheckNativeValue() {
							const e = this._elementRef.nativeElement.value;
							this._previousNativeValue !== e && (this._previousNativeValue = e, this.stateChanges.next())
						}
						_validateType() {
							v3.indexOf(this._type)
						}
						_isNeverEmpty() {
							return this._neverEmptyInputTypes.indexOf(this._type) > -1
						}
						_isBadInput() {
							let e = this._elementRef.nativeElement.validity;
							return e && e.badInput
						}
						get empty() {
							return !(this._isNeverEmpty() || this._elementRef.nativeElement.value || this._isBadInput() || this.autofilled)
						}
						get shouldLabelFloat() {
							if (this._isNativeSelect) {
								const e = this._elementRef.nativeElement,
									r = e.options[0];
								return this.focused || e.multiple || !this.empty || !!(e.selectedIndex > -1 && r && r.label)
							}
							return this.focused || !this.empty
						}
						setDescribedByIds(e) {
							e.length ? this._elementRef.nativeElement.setAttribute("aria-describedby", e.join(" ")) : this._elementRef.nativeElement.removeAttribute("aria-describedby")
						}
						onContainerClick() {
							this.focused || this.focus()
						}
						_isInlineSelect() {
							const e = this._elementRef.nativeElement;
							return this._isNativeSelect && (e.multiple || e.size > 1)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(U), p(_r), p(ur, 10), p(Vo, 8), p(nu, 8), p(FM), p(_3, 10), p(y3), p(se), p(KM, 8))
					}, t.\u0275dir = x({
						type: t,
						selectors: [
							["input", "matInput", ""],
							["textarea", "matInput", ""],
							["select", "matNativeControl", ""],
							["input", "matNativeControl", ""],
							["textarea", "matNativeControl", ""]
						],
						hostAttrs: [1, "mat-input-element", "mat-form-field-autofill-control"],
						hostVars: 12,
						hostBindings: function(e, r) {
							1 & e && Ze("focus", function() {
								return r._focusChanged(!0)
							})("blur", function() {
								return r._focusChanged(!1)
							})("input", function() {
								return r._onInput()
							}), 2 & e && (yf("disabled", r.disabled)("required", r.required), Tt("id", r.id)("data-placeholder", r.placeholder)("name", r.name || null)("readonly", r.readonly && !r._isNativeSelect || null)("aria-invalid", r.empty && r.required ? null : r.errorState)("aria-required", r.required), Ft("mat-input-server", r._isServer)("mat-native-select-inline", r._isInlineSelect()))
						},
						inputs: {
							disabled: "disabled",
							id: "id",
							placeholder: "placeholder",
							name: "name",
							required: "required",
							type: "type",
							errorStateMatcher: "errorStateMatcher",
							userAriaDescribedBy: ["aria-describedby", "userAriaDescribedBy"],
							value: "value",
							readonly: "readonly"
						},
						exportAs: ["matInput"],
						features: [be([{
							provide: _g,
							useExisting: t
						}]), M, mt]
					}), t
				})(),
				D3 = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						providers: [FM],
						imports: [YM, vg, Kt, YM, vg]
					}), t
				})();
			const x3 = ["usernameInput"],
				E3 = ["passwordInput"];
			let M3 = (() => {
					class t {
						constructor(e, r) {
							this.authService = e, this.router = r, this.loginError = !1, this.TEST_REALM = "https://admin.pwnme.org", this.REALM = "https://pwnme.org"
						}
						ngOnInit() {
							this.authService.isLoggedIn() && this.router.navigate(["/dashboard"])
						}
						handleClickLogin() {
							this.authService.authenticate({
								username: this.usernameInput.nativeElement.value,
								password: this.passwordInput.nativeElement.value,
								realm: this.REALM
							}).subscribe({
								next: () => {
									this.loginError = !1, this.usernameInput.nativeElement.value = "", this.passwordInput.nativeElement.value = ""
								},
								error: () => {
									this.loginError = !0, this.usernameInput.nativeElement.value = "", this.passwordInput.nativeElement.value = ""
								}
							})
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(p(ec), p(qe))
					}, t.\u0275cmp = en({
						type: t,
						selectors: [
							["app-login"]
						],
						viewQuery: function(e, r) {
							if (1 & e && (si(x3, 5), si(E3, 5)), 2 & e) {
								let i;
								Je(i = et()) && (r.usernameInput = i.first), Je(i = et()) && (r.passwordInput = i.first)
							}
						},
						decls: 16,
						vars: 1,
						consts: [
							["fxLayoutAlign", "center center", "fxFlexFill", ""],
							["fxFlex", "25", "fxFlex.md", "50", "fxFlex.sm", "50", "fxFlex.xs", "90"],
							["fxLayoutAlign", "center"],
							["src", "assets/img/admin.png", 1, "login-image"],
							["fxLayoutAlign", "stretch", "fxLayout", "column"],
							["fxLayoutAlign", "center", 1, "login-title"],
							["matInput", "", "type", "text", "placeholder", "Username", "name", "username", "autofocus", ""],
							["usernameInput", ""],
							["matInput", "", "type", "password", "placeholder", "Password", "name", "password"],
							["passwordInput", ""],
							["fxLayoutAlign", "space-around", "fxLayout", "column"],
							["fxFlex", "50", "mat-flat-button", "", "color", "primary", 3, "disabled", "click"]
						],
						template: function(e, r) {
							if (1 & e && (me(0, "div", 0)(1, "mat-card", 1)(2, "div", 2), bt(3, "img", 3), De(), me(4, "form", 4)(5, "h1", 5), ni(6, "Admin Portal"), De(), me(7, "mat-form-field"), bt(8, "input", 6, 7), De(), me(10, "mat-form-field"), bt(11, "input", 8, 9), De(), me(13, "div", 10)(14, "button", 11), Ze("click", function() {
									return r.handleClickLogin()
								}), ni(15, "Login"), De()()()()()), 2 & e) {
								const i = df(9),
									s = df(12);
								Ye(14), Be("disabled", !(i.value && s.value))
							}
						},
						dependencies: [uM, dg, cg, ug, m3, C3, PM, LM, yD, JC, Vo],
						styles: [".login-image[_ngcontent-%COMP%]{height:auto;width:100%;width:100px;padding:15px;border-radius:50%}.login-spacer[_ngcontent-%COMP%]{height:15px}.login-title[_ngcontent-%COMP%]{margin-top:5px;color:#73c2be}h2[_ngcontent-%COMP%]{color:red;font-weight:700}.forgot-password[_ngcontent-%COMP%]{color:#e3e000;padding:5px 5px 15px;cursor:pointer}"]
					}), t
				})(),
				ZM = (() => {
					class t {
						constructor(e, r) {
							this.authService = e, this.router = r
						}
						canActivate() {
							return !!this.authService.isLoggedIn() || (this.router.navigate(["/login"]), !1)
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(ec), b(qe))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac
					}), t
				})();
			const A3 = [{
				path: "login",
				component: M3
			}, {
				path: "dashboard",
				component: kG,
				canActivate: [ZM]
			}, {
				path: "**",
				redirectTo: "/login"
			}];
			let S3 = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [GE.forRoot(A3), GE]
					}), t
				})(),
				I3 = (() => {
					class t {
						constructor() {
							this.title = "jwt"
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275cmp = en({
						type: t,
						selectors: [
							["app-root"]
						],
						decls: 1,
						vars: 0,
						template: function(e, r) {
							1 & e && bt(0, "router-outlet")
						},
						dependencies: [Bp]
					}), t
				})(),
				rA = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [ig]
					}), t
				})(),
				dA = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [ig]
					}), t
				})(),
				g8 = (() => {
					class t {
						constructor(e, r) {
							gs(r) && !e && console.warn("Warning: Flex Layout loaded on the server without FlexLayoutServerModule")
						}
						static withConfig(e, r = []) {
							return {
								ngModule: t,
								providers: e.serverLoaded ? [{
									provide: Sn,
									useValue: {
										...sg,
										...e
									}
								}, {
									provide: og,
									useValue: r,
									multi: !0
								}, {
									provide: Ms,
									useValue: !0
								}] : [{
									provide: Sn,
									useValue: {
										...sg,
										...e
									}
								}, {
									provide: og,
									useValue: r,
									multi: !0
								}]
							}
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(Ms), b(an))
					}, t.\u0275mod = de({
						type: t
					}), t.\u0275inj = ce({
						imports: [hM, rA, dA, hM, rA, dA]
					}), t
				})(),
				m8 = (() => {
					class t {
						constructor(e) {
							this.authService = e
						}
						intercept(e, r) {
							const i = this.authService.getSessionModelFromSessionStorage();
							return r.handle(e.clone({
								setHeaders: {
									Authorization: `Bearer ${i.acceessToken}`
								}
							}))
						}
					}
					return t.\u0275fac = function(e) {
						return new(e || t)(b(ec))
					}, t.\u0275prov = E({
						token: t,
						factory: t.\u0275fac
					}), t
				})(),
				y8 = (() => {
					class t {}
					return t.\u0275fac = function(e) {
						return new(e || t)
					}, t.\u0275mod = de({
						type: t,
						bootstrap: [I3]
					}), t.\u0275inj = ce({
						providers: [{
							provide: Wh,
							useClass: m8,
							multi: !0
						}, ZM],
						imports: [bC, dH, S3, aV, g8, vg, D3, hG, oG, WP, vG, RG]
					}), t
				})();
			(function rN() {
				_w = !1
			})(), FL().bootstrapModule(y8).catch(t => console.error(t))
		}
	},
	ne => {
		ne(ne.s = 498)
	}
]);
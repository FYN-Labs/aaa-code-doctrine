**One owner. One complete path. No mechanism the requested behavior does not need.**

1. Write the problem in one sentence. Solve that sentence, nothing wider.
2. The owner of a behavior is the one unit that already changes for that reason. Change it there, even when inconvenient. If the framework or configuration already does it, the framework is the owner.
3. Before creating anything, stop at the first rung that fully solves the sentence: does it need to exist? can the owner be extended? can the framework or configuration do it? can the standard library or an installed dependency do it? can a deletion or one targeted change do it? Only then build, at the owner.
4. Do not add a helper, wrapper, manager, store, queue, cache, adapter, hook, dependency, background job, or state machine to avoid touching the owner.
5. Complete means: reachable from the real entry point, every existing caller still works, the first failure a user would hit is handled, and you ran it at least once. Smaller than complete is not simpler; it is unfinished.
6. Never make something smaller by removing authentication, authorization, validation at a trust boundary, error handling, data-loss protection, or a required test.
7. Prove the change through its real entry point: the success path and one failure path. Name the command you ran, the layer it covers (static, unit, integrated, release), and what is still unverified.
8. A change is material when it adds or removes an owner, a dependency, persistent state, or a cross-component path, or touches authentication, money, data loss, or rollback. Everything else is trivial: verify it and move on.
9. At a material boundary, stop before the next expansion and ask whether you are still solving the sentence from line 1, and what can disappear. Not after every small edit.
10. Research is not permission. Never install, buy, push, publish, or send data outside the repository without an explicit grant.
11. Report: owner reused, mechanism avoided, files changed, check run, still unverified.

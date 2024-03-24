# fastify-txstate-shared
Types and any other code shared by both fastify APIs and the UIs they communicate with.

## InteractionEvent
A fastify-txstate API that opts into analytics will have a POST '/analytics' route where
the body accepts an InteractionEvent, appends more information to it, and sends it along
to the analytics database. This library provides both a json-schema and a typescript type
defining this event.

Pay close attention to the comments on each property, so you'll know how to fill it in.
If we all share an understanding of what the analytics data means, it will be cleaner when
we go to run our reports.

## Building this library
`npm run build` takes care of everything.

If you add a new json-schema that needs typescript types automatically generated, you
need to add a line to the `main()` function in `src/build.ts` executing `convert` on
your schema and giving its type a name.

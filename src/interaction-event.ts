import { JSONSchema } from 'json-schema-to-typescript'

export const interactionEvent = {
  type: 'object',
  description:
`InteractionEvent defines the shape of the data we will send to an /analytics
endpoint when we want to record a user interaction in our UI.

The /analytics endpoint will append more information based on the useragent, ip
address, and authentication. Then it will send the result to our analytics database.`,
  properties: {
    eventType: {
      type: 'string',
      description:
`This serves as an identifier for the code that generated the event. For
example, a react or svelte component that logs presses of a specific button
might name the eventType after the component's name.

It should be easily readable but also help us identify the line of code that
generated the event.`
    },
    screen: {
      type: 'string',
      description:
`The page, screen, or dialog the user is looking at in which the associated
event emitter is in context to.

This is NOT identical to what is in the address bar, for two reasons:

1) The address bar usually includes the id of objects, e.g. '/pages/12' for a
page detail screen. This would make it difficult to generate analytics reports
on the page detail screen. Instead, use the string you'd pass to a router,
e.g. '/pages/[id]'.

2) If a single screen has a lot of different, large, interactive dialogs, it's
helpful to add that context to the string after a hash (#). This does not need
to match the browser address bar.

The key is to keep everything easily human readable, consistent over time, and
make it easy to generate reports on how users are interacting with our pages/dialogs.`,
      examples: ['/pages', '/pages/[id]', '/pages/[id]#dialog']
    },
    action: {
      type: 'string',
      description:
`The specific action the user took. Typically the label for the button that
the user interacted with, but could also be other types of interactions like
swipes. Human readable and easily grouped.`,
      examples: ['Add Page', 'Edit Page', 'Preview', 'Cancel Preview', 'Download', 'Swipe Photo Preview']
    },
    target: {
      type: 'string',
      description:
`If applicable, the target of the action.

With this property, we are interested in tracking which objects in the system are getting
attention, so it should be as specific as possible.

For example, if you are tracking a page navigation, the \`screen\` is where the user was
and the \`target\` is where the user went, but the \`target\` would be '/pages/12' instead
of 'pages/[id]'.

When possible, a full path or GUID is preferred, e.g. '/pages/12' instead of '12'. This way you
could easily group different actions and eventTypes on a given target, without worrying
that you are accidently grouping in the asset or site or user with an id of 12.

You can also include even more hierarchical context for ease of reporting. For instance,
'/sites/5/pages/12' could be used instead of '/pages/12', which would allow a report to
group across targets that begin with '/sites/5'.`,
      examples: ['/sites/5/pages/12']
    },
    additionalProperties: {
      type: 'object',
      description:
`Additional data points specific to a particular eventType context. Use this sparingly
when the existing properties above are insufficient for a report that needs to be built.

This is NOT a catch-all property. Everything added here expands the index in elasticsearch
and has performance and disk usage implications.`,
      examples: [{ secondaryTarget: '/pages/14' }],
      additionalProperties: { type: 'string' }
    }
  },
  required: ['eventType', 'screen', 'action'],
  additionalProperties: false
} as const satisfies JSONSchema

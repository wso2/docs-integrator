import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';

type Route = {
  need: ReactNode;
  use: ReactNode;
};

const DURABLE = <strong>Durable Workflows</strong>;

// Order matters: the durable rows come first, so a need that matches any of
// them never falls through to the gated tools row at the bottom.
const ROUTES: Route[] = [
  {
    need: 'A process that waits hours or days on a timer or an event, or must continue after a crash partway through',
    use: (
      <>
        {DURABLE}, as a <Link to="/develop-and-test/integration-artifacts/workflow">durable workflow</Link> or durable agent
      </>
    ),
  },
  {
    need: 'Approval from someone other than the person using the agent, such as a manager or a Finance role',
    use: (
      <>
        {DURABLE}, with an{' '}
        <Link to="/develop-and-test/integration-artifacts/workflow/durable-workflow/review-activity-and-error-handling#approval-gates--review-before-the-step-runs">
          approval gate
        </Link>{' '}
        on an activity
      </>
    ),
  },
  {
    need: 'A record of who approved and when',
    use: (
      <>
        {DURABLE}, with a <Link to="/develop-and-test/integration-artifacts/workflow/durable-workflow/await-human-task">human task</Link>
      </>
    ),
  },
  {
    need: 'A deadline, reminder, or escalation on the decision',
    use: (
      <>
        {DURABLE}, with a human task{' '}
        <Link to="/develop-and-test/integration-artifacts/workflow/durable-workflow/await-human-task#bound-the-wait">timeout</Link>
      </>
    ),
  },
  {
    need: 'The person to supply a value, such as a corrected amount, not just yes or no',
    use: (
      <>
        {DURABLE}, with a{' '}
        <Link to="/develop-and-test/integration-artifacts/workflow/durable-workflow/await-human-task#type-the-decision">typed decision</Link>
      </>
    ),
  },
  {
    need: 'A person to fix a step that failed',
    use: (
      <>
        {DURABLE}, with the{' '}
        <Link to="/develop-and-test/integration-artifacts/workflow/durable-workflow/review-activity-and-error-handling#human-review--when-a-person-should-fix-it">
          Human Review
        </Link>{' '}
        retry policy
      </>
    ),
  },
  {
    need: 'Human approval in a process with no AI agent',
    use: (
      <>
        {DURABLE}, with an <Link to="/develop-and-test/integration-artifacts/workflow/durable-workflow/await-human-task">Await Human Task</Link> step
      </>
    ),
  },
  {
    need: 'None of the above. The person using the agent approves or rejects a tool call before it runs.',
    use: (
      <strong>
        <Link to="/develop-and-test/integration-artifacts/ai-integrations/agents/gated-tools">Gated Tools</Link>
      </strong>
    ),
  },
];

/**
 * Routes a reader to gated tools or durable workflows. Rendered on both the
 * Gated Tools page and the Durable Workflows overview, so the two stay identical.
 */
export default function HitlRoutingTable(): ReactNode {
  return (
    <>
      <p>Go down the list and stop at the first row that matches.</p>
      <table>
        <thead>
          <tr>
            <th>If you need</th>
            <th>Use</th>
          </tr>
        </thead>
        <tbody>
          {ROUTES.map((route, index) => (
            <tr key={index}>
              <td>{route.need}</td>
              <td>{route.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

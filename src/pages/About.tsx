export default function About() {
  return (
    <main className="mx-auto max-w-3xl p-8 leading-relaxed">
      <h1 className="text-primary mb-6 text-3xl font-bold">
        About This Project
      </h1>

      <p className="text-muted-foreground mb-4">
        This project was created as part of the{" "}
        <strong>Developing Software Solutions</strong> course at the{" "}
        <strong>
          University of Ljubljana, School of Economics and Business
        </strong>
        . It serves as my semester project assignment for the course.
      </p>

      <p className="text-muted-foreground mb-4">
        I decided to build an{" "}
        <strong>Algorithm and Data Structure Visualizer</strong> because I
        wanted to challenge myself with new technologies such as{" "}
        <strong>React Flow</strong> for animating data structure logic. Beyond
        meeting the course requirements, this project also acts as a practical
        learning tool and a resource for anyone who wants to better understand
        how algorithms and data structures work step by step.
      </p>

      <p className="text-muted-foreground mb-4">
        Through this project, I&apos;ve been able to refresh my knowledge of
        fundamental computer science concepts, strengthen my skills in React and
        TypeScript, and explore modern front-end tools such as{" "}
        <strong>Vite</strong>, <strong>TailwindCSS</strong>, and{" "}
        <strong>shadcn/ui</strong>. It&apos;s also been a great opportunity to
        focus on clear data visualization and interactive learning design.
      </p>

      <h2 className="mt-8 mb-2 text-2xl font-semibold">Goals of the Project</h2>
      <ul className="text-muted-foreground list-inside list-disc space-y-1">
        <li>
          Learn and become better with the following technologies (React Flow,
          shadcn/ui)
        </li>
        <li>Build a simple and interactive educational tool</li>
        <li>Visualize classic algorithms and data structures dynamically</li>
        <li>Refresh and reinforce my understanding of core CS concepts</li>
      </ul>
    </main>
  );
}

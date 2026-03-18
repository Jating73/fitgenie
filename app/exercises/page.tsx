import { Suspense } from "react";
import ExercisesClient from "./ExercisesClient";

export default function ExercisesPage() {

  return (
    <Suspense fallback={<div className="page-enter">Loading...</div>}>
      <ExercisesClient />
    </Suspense>
  )
}

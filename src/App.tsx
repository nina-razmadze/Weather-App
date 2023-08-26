import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomeView = lazy(() => import("./views/HomeView"));
const CityView = lazy(() => import("./views/CityView"));

function App() {
  return (
    <Suspense
      fallback={
        <div>lo</div>
        // <Skeleton variant="rounded" width={210} height={60} animation="wave" />
      }
    >
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/:cityName" element={<CityView />} />
      </Routes>
    </Suspense>
  );
}

export default App;

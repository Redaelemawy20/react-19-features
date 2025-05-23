import CounterUseActionState from './components/CounterUseActionState';
import FormUseActionState from './components/FormUseActionState';
import UseOptimistic from './components/UseOptimistic';
function App() {
  return (
    <>
      <UseOptimistic />
      <FormUseActionState />
      <CounterUseActionState />
    </>
  );
}

export default App;

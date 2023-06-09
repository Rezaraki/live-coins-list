import { Spin } from "antd";

const Spinner = () => {
  return (
    <div className="w-full h-screen bg-slate-900 flex justify-center pt-10">
      <Spin size="large" />
    </div>
  );
};
export default Spinner;

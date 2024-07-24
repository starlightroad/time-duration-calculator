import { SubmitHandler, useForm } from 'react-hook-form';
import type { Time } from '@/src/lib/definitions';
import { useStore } from '@/src/hooks/use-store';
import Form from '@/src/ui/core/form';
import Label from '@/src/ui/core/label';
import Button from '@/src/ui/core/button';

type Data = {
  startTime: string;
  endTime: string;
};

function Panel({ data }: { data?: Time }) {
  const formatTimeStr = (str: string, num?: number) => (Number(num) === 1 ? str.slice(0, -1) : str);

  const accumulate = (arr: number[]) => arr.reduce((acc, currVal) => acc + currVal);

  const setFixedPoint = (num: number, digits: number = 2) =>
    (!(num % 2) && num) || num.toFixed(digits);

  const daysOnly = accumulate([
    Number(data?.days),
    Number(data?.hours) / 24,
    Number(data?.minutes) / 60 / 24,
  ]);

  const hoursOnly = accumulate([
    Number(data?.days) * 24,
    Number(data?.hours),
    Number(data?.minutes) / 60,
  ]);

  const minutesOnly = accumulate([
    Number(data?.days) * 24 * 60,
    Number(data?.hours) * 60,
    Number(data?.minutes),
  ]);

  return (
    <div className="mb-4 w-full rounded-xl border border-indigo-600 bg-indigo-50 p-3 text-center text-indigo-600">
      <p className="flex justify-center gap-2">
        <span>
          {data?.days} {formatTimeStr('days', data?.days)}
        </span>
        <span>
          {data?.hours} {formatTimeStr('hours', data?.hours)}
        </span>
        <span>
          {data?.minutes} {formatTimeStr('minutes', data?.minutes)}
        </span>
      </p>
      <p>or</p>
      <p>
        <span>
          {setFixedPoint(daysOnly)} {formatTimeStr('days', daysOnly)}
        </span>
      </p>
      <p>or</p>
      <p>
        <span>
          {setFixedPoint(hoursOnly)} {formatTimeStr('hours', hoursOnly)}
        </span>
      </p>
      <p>or</p>
      <p>
        <span>
          {setFixedPoint(minutesOnly)} {formatTimeStr('minutes', minutesOnly)}
        </span>
      </p>
    </div>
  );
}

const calculateTime = (data: Data) => {
  let startTime: Date;
  let endTime: Date;

  const timeRegex =
    /^((\d{1,2})(-|\/)(\d{1,2})(-|\/)(\d{2,4})|(^(\d{2,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})))/;

  if (!data.startTime.match(timeRegex)) {
    // Use today's date
    startTime = new Date(new Date().toISOString().replace(/T.+/, ` ${data.startTime}`));
    endTime = new Date(new Date().toISOString().replace(/T.+/, ` ${data.endTime}`));
  } else {
    // Use predefined dates
    startTime = new Date(data.startTime);
    endTime = new Date(data.endTime);
  }

  let ms = Math.abs(endTime.valueOf() - startTime.valueOf()) / 1000;

  // Calculate days
  const days = Math.floor(ms / 86400);
  ms -= days * 86400;

  // Calculate hours
  const hours = Math.floor(ms / 3600) % 24;
  ms -= hours * 3600;

  // Calculate minutes
  const minutes = Math.floor(ms / 60) % 60;
  ms -= minutes * 60;

  // Calculate seconds
  const seconds = Math.ceil(ms % 60);

  return { ms, seconds, minutes, hours, days };
};

export default function Calculator() {
  const [store, dispatch] = useStore();
  const { handleSubmit, register, reset } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = (data) => {
    dispatch({
      type: 'calculated',
      time: calculateTime(data),
    });
  };

  const onReset = () => {
    reset();
    dispatch({
      type: 'reset',
    });
  };

  return (
    <div className="mx-auto grid w-full max-w-80 gap-4 rounded-xl px-4 py-5">
      {!store.calculator.panel.hidden && <Panel data={store.calculator.calculation} />}
      <Form onSubmit={handleSubmit(onSubmit)} onReset={() => onReset()} className="grid gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="startTime" className="font-medium text-gray-600">
            Start Time
          </Label>
          <input
            id="startTime"
            {...register('startTime')}
            type="text"
            placeholder="09:00 AM"
            autoComplete="off"
            className="block h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 text-gray-600 ring-indigo-600 focus-within:ring-2 focus-within:ring-offset-2 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="endTime" className="font-medium text-gray-600">
            End Time
          </Label>
          <input
            id="endTime"
            {...register('endTime')}
            type="text"
            placeholder="05:00 PM"
            autoComplete="off"
            className="block h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 text-gray-600 ring-indigo-600 focus-within:ring-2 focus-within:ring-offset-2 focus:outline-none"
          />
        </div>
        <div className="mt-2">
          <Button
            type="submit"
            className="h-10 w-full appearance-none rounded-lg bg-indigo-600 px-4 font-medium text-white focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus:outline-none"
          >
            Calculate
          </Button>
          <Button
            type="reset"
            className="mt-2 h-10 w-full appearance-none rounded-lg px-4 font-medium text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:bg-indigo-50 focus:outline-none"
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}

'use client';
import { cn } from '@/lib/utils';
import { motion, SpringOptions, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';
import { toast } from 'sonner'; 
export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: React.ElementType;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = 'span',
}: AnimatedNumberProps) {
  const MotionComponent = motion(as);

  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
  current.toFixed(1)
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    let hasTriggered = false;
    
    const unsubscribe = spring.on("change", (current) => {
      const velocity = spring.getVelocity();
      const difference = Math.abs(current - value);
      
      // Trigger when velocity is very low AND close to target
      if (Math.abs(velocity) < 0.05 && difference < 0.1 && !hasTriggered) {
        hasTriggered = true;
        toast("greetings from dezeray");
      }
    });

    return () => unsubscribe();
  }, [spring, value]);

  return (
    <MotionComponent className={cn('tabular-nums', className)}>
      {display}
    </MotionComponent>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

import type { Mcq } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface McqCardProps {
  mcq: Mcq;
  questionNumber: number;
}

export function McqCard({ mcq, questionNumber }: McqCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSelectAnswer = (option: string) => {
    if (isRevealed) return;
    setSelectedAnswer(option);
    setIsRevealed(true);
  };

  const getOptionState = (option: string) => {
    if (!isRevealed) return 'default';
    if (option === mcq.correctAnswer) return 'correct';
    if (option === selectedAnswer) return 'incorrect';
    return 'default';
  };

  const shuffledOptions = useState(() => [...mcq.options].sort(() => Math.random() - 0.5))[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: questionNumber * 0.1 }}
      >
        <Card className="overflow-hidden transition-all hover:border-primary/40 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold leading-relaxed">
              <span className="text-primary mr-2">{questionNumber}.</span>
              {mcq.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shuffledOptions.map((option, i) => {
                const state = getOptionState(option);
                return (
                  <Button
                    key={i}
                    variant="outline"
                    onClick={() => handleSelectAnswer(option)}
                    disabled={isRevealed}
                    className={cn(
                      'justify-start text-left h-auto py-3 leading-snug transition-all duration-300 relative',
                      'disabled:opacity-100 disabled:cursor-pointer',
                      isRevealed && state === 'default' && 'opacity-50',
                      state === 'correct' && 'bg-primary/10 border-primary text-primary-foreground hover:bg-primary/20',
                      state === 'incorrect' && 'bg-destructive/10 border-destructive text-destructive-foreground hover:bg-destructive/20'
                    )}
                  >
                    <span className="flex-1 mr-4">{option}</span>
                    <AnimatePresence>
                      {isRevealed && state === 'correct' && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </motion.div>
                      )}
                      {isRevealed && state === 'incorrect' && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <XCircle className="h-5 w-5 text-destructive" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                );
              })}
            </div>
          </CardContent>
          <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <CardFooter>
                  <Badge variant={selectedAnswer === mcq.correctAnswer ? "default" : "destructive"}>
                    {selectedAnswer === mcq.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </Badge>
              </CardFooter>
            </motion.div>
          )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

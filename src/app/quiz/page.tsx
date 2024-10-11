"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { users } from "@/db/schema";
import { db } from "@vercel/postgres";


const FormSchema = z.object({
  question1: z.enum(["A", "B", "C", "D"], {
    required_error: "You need to select an answer for Question 1.",
  }),
  question2: z.enum(["A", "B", "C", "D"], {
    required_error: "You need to select an answer for Question 2.",
  }),
  question3: z.enum(["A", "B", "C", "D"], {
    required_error: "You need to select an answer for Question 3.",
  }),
  question4: z.enum(["A", "B", "C", "D"], {
    required_error: "You need to select an answer for Question 4.",
  }),
  question5: z.enum(["A", "B", "C", "D"], {
    required_error: "You need to select an answer for Question 5.",
  }),
});

type QuestionType = {
  [key: string]: "A" |"B" |"C" |"D" 
}

const correctAnswers : QuestionType = {
  question1: 'B',
  question2: 'B',
  question3: 'B',
  question4: 'B',
  question5: 'B',
}





export default function Quiz() {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof FormSchema>>({
    	resolver: zodResolver(FormSchema),
	})

  async function onSubmit(data: QuestionType) {
    // compare user's answers with correct answers and generate feeedback
    const feedback = Object.keys(data).map((key) => {
      const isCorrect = data[key] === correctAnswers[key as keyof typeof data];

      return {
        question: key,
        isCorrect,
        userAnswer: data[key],
        correctAnswer: correctAnswers[key as keyof typeof data],
      };
    });

    // Show feedback in the toast
    toast({
      title: "Quiz Results",
      description: (
        <div className="mt-2 space-y-3">
          {feedback.map((result, index) => (
            <div key={index}>
              <strong>Question {index + 1}: </strong>
              {result.isCorrect ? (
                <span className="text-green-500">Correct!</span>
              ) : (
                <>
                  <span className="text-red-500">Incorrect.</span> Your answer:{" "}
                  {result.userAnswer}, Correct answer: {result.correctAnswer}
                </>
              )}
            </div>
          ))}
        </div>
      ),
    });
    
  }



	return (
    	<Form {...form}>
        	<form onSubmit={form.handleSubmit(onSubmit)} className="w2/3 space-y-6">
            	<FormField
                	control={form.control}
                	name="question1"
                	render={({ field }) => (
                    	<FormItem className = 'space-y-3'>
                        	<FormLabel>Question 1:</FormLabel>
                        	<FormDescription>Why is it dangerous to experiment with drugs, even just once?</FormDescription>
                            	<FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className = 'flex flex-col space-y-1'
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="A" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        A. It is not dangerous at all
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="B" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        B. It can lead to addiction or serious health problems
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="C" />
                        </FormControl>
                        <FormLabel className="font-normal">C. It will only affect older adults</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="D" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          D. Drugs have no long-term impact Why it is important: To emphasize that even a single instance of drug use can have serious consequences. 
                        </FormLabel>
                      </FormItem>


                    </RadioGroup>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

<FormField
                	control={form.control}
                	name="question2"
                	render={({ field }) => (
                    	<FormItem className = 'space-y-3'>
                        	<FormLabel>Question 2:</FormLabel>
                        	<FormDescription>What should you do if someone offers you drugs at a party?</FormDescription>
                            	<FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className = 'flex flex-col space-y-1'
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="A" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        A. Take it so they will not think you are uncool
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="B" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        B. Politely say no and walk away
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="C" />
                        </FormControl>
                        <FormLabel className="font-normal">C. Just hold it, but don not use it</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="D" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          D. Use it just to see what happens Why it is important: Teaching kids how to handle peer pressure in a social setting. 
                        </FormLabel>
                      </FormItem>


                    </RadioGroup>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
<FormField
                	control={form.control}
                	name="question3"
                	render={({ field }) => (
                    	<FormItem className = 'space-y-3'>
                        	<FormLabel>Question 3:</FormLabel>
                        	<FormDescription>Which of the following is a long-term effect of drug abuse?</FormDescription>
                            	<FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className = 'flex flex-col space-y-1'
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="A" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        A. Improved memory and focus
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="B" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        B. Damage to the brain, heart, liver
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="C" />
                        </FormControl>
                        <FormLabel className="font-normal">C. Stronger immune system</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="D" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          D. Clearer thinking and judgment Why it is important: Educating teens on the long-term health risks of drug abuse.
                        </FormLabel>
                      </FormItem>


                    </RadioGroup>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
<FormField
                	control={form.control}
                	name="question4"
                	render={({ field }) => (
                    	<FormItem className = 'space-y-3'>
                        	<FormLabel>Question 4:</FormLabel>
                        	<FormDescription>How can using drugs affect your relationships with friends and family?</FormDescription>
                            	<FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className = 'flex flex-col space-y-1'
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="A" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        A. It will make your relationships stronger
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="B" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        B. It may cause trust issues, conflict, or isolation
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="C" />
                        </FormControl>
                        <FormLabel className="font-normal">C. There's no impact on relationships</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          D. It will make you more popular with friends Why it is important: Helping teens understand the social and emotional consequences of drug use.
                        </FormLabel>
                      </FormItem>


                    </RadioGroup>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
<FormField
                	control={form.control}
                	name="question5"
                	render={({ field }) => (
                    	<FormItem className = 'space-y-3'>
                        	<FormLabel>Question 5:</FormLabel>
                        	<FormDescription>What should you do if you suspect a friend is using drugs?</FormDescription>
                            	<FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className = 'flex flex-col space-y-1'
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="A" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        A. Keep it a secret to protect them
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="B" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        B. Encourage them to talk to a trusted adult or counselor
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="C" />
                        </FormControl>
                        <FormLabel className="font-normal">C. Join them to understand what they are going through</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="D" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          D. Ignore it and hope they stop Why it is important: Emphasizing the importance of helping a friend in need and seeking support.
                        </FormLabel>
                      </FormItem>


                    </RadioGroup>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />



            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
    }


 // 2. Define a submit handler.
 

 

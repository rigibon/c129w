/**
 * Interface for AI Provider adapters
 * Allows easy switching between different AI APIs (Gemini, OpenAI, etc.)
 */
export interface IAIProvider {
  /**
   * Send a message to the AI and get a response
   * @param prompt The message/prompt to send
   * @returns The AI's response as a string
   */
  sendMessage(prompt: string): Promise<string>;

  /**
   * Get the name of the provider
   */
  getProviderName(): string;
}

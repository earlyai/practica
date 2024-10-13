// Unit tests for: errorHandler

import { AppError, errorHandler } from "../error-handling";

describe("errorHandler() errorHandler method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    beforeEach(() => {
      // This test aims to ensure that the error is logged correctly.
      console.error = jest.fn(); // Mock console.error
    });

    it("should log the error to the console", async () => {
      const errorToHandle = new Error("Test error");
      await errorHandler.handleError(errorToHandle);
      expect(console.error).toHaveBeenCalledWith(errorToHandle);
    });

    it("should log an AppError correctly", async () => {
      const appError = new AppError("ValidationError", "Invalid input");
      await errorHandler.handleError(appError);
      expect(console.error).toHaveBeenCalledWith(appError);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    beforeEach(() => {
      // This test aims to ensure that the error is logged correctly.
      console.error = jest.fn(); // Mock console.error
      console.log = jest.fn(); // Mock console.log
    });

    it("should handle null error gracefully", async () => {
      await errorHandler.handleError(null);
      expect(console.error).toHaveBeenCalledWith(null);
    });

    it("should handle undefined error gracefully", async () => {
      await errorHandler.handleError(undefined);
      expect(console.error).toHaveBeenCalledWith(undefined);
    });

    it("should handle an empty string as an error", async () => {
      await errorHandler.handleError("");
      expect(console.error).toHaveBeenCalledWith("");
    });

    it("should handle a number as an error", async () => {
      await errorHandler.handleError(404);
      expect(console.error).toHaveBeenCalledWith(404);
    });

    it("should not throw an error if console.error fails", async () => {
      console.error = jest.fn(() => {
        throw new Error("Logging failed");
      });
      const consoleLogSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      await errorHandler.handleError(new Error("Test error"));

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("handleError threw an error")
      );
      consoleLogSpy.mockRestore();
    });
  });
});

// End of unit tests for: errorHandler

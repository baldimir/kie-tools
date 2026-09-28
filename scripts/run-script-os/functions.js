/*
 * MIT License
 *
 * Copyright (c) 2017 Charlie Guse
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Match script to the list of available scripts, or check for aliases
 *
 * The order for checking matches should be direct-platform and then aliases
 *
 * @param {string} script   - name of the script to be matched paired to the platform or alias
 * @param {string} platform - name of the platform to be paired with the script
 * @param {array}  scripts  - list of available scripts defined in package.json
 */
exports.matchScript = function matchScript(script, platform, scripts) {
  /**
   * Save the result so we can determine if there was a match
   * First check for a basic match before we have to go through each script with a regex
   */
  let result = `${script}:${platform}` in scripts ? `${script}:${platform}` : false;
  if (result) return result;

  /**
   * Regular expression match
   * it helps when the "in" operator can't determine if there's a real match or not,
   * due to the properties changing
   */
  let regex = new RegExp(`^(${script}):([a-zA-Z0-9-]*:)*(${platform})(:[a-zA-Z0-9-]*)*$`, "g");
  for (let command in scripts) {
    if (command.match(regex)) return command;
  }

  /**
   * Alias match, allows for a more verbose description of the platform
   * it also helps to group similar platforms on a single execution
   */
  switch (platform) {
    case "win32":
      result = `${script}:windows` in scripts ? `${script}:windows` : false;
      break;

    case "aix":
    case "linux":
    case "sunos":
    case "openbsd":
    case "freebsd":
    case "android":
      result = `${script}:nix` in scripts ? `${script}:nix` : false;
      break;

    case "darwin":
    case "macos":
      /**
       * macOS specific scripts (e.g. brew)
       */
      result = `${script}:macos` in scripts ? `${script}:macos` : false;

      /**
       * nix compatible scripts (cp, rm...)
       */
      if (!result) result = `${script}:nix` in scripts ? `${script}:nix` : false;

      break;
    default:
      result = false;
  }

  /**
   * Successful finding of a given script by platform, present it.
   */
  if (result) return result;

  /**
   * Fall to default if it's given, otherwise fail
   */
  return `${script}:default` in scripts ? `${script}:default` : false;
};

/**
 * Expand the shorthand description for npm commands
 *
 * i.e. npm i -> npm install
 *
 * @param  String shorthand   Shorthand command to be expanded
 * @return String             Actual command
 */
exports.expandShorthand = function expandShorthand(shorthand) {
  switch (shorthand) {
    case "i":
      return "install";

    case "t":
    case "tst":
      return "test";

    /**
     * Expansion is not possible
     * @type {[type]}
     */
    default:
      return shorthand;
  }
};

Servo-experiments

A collection of experiments for Servo.  [Get Servo Nightly](https://servo-builds.s3.amazonaws.com/index.html).

These demos aim to show off Servo's rendering capabilities.

## Running Servo
* The easiest way to run Servo is to get [Servo nightly](http://download.servo.org).
* Alternately, clone source from the [Servo repos.](https://github.com/servo/servo) and follow instructions there.

If running from source we recommend using <br />
`./mach run -r -w [URL]` <br />
The `-r` specifies to use the version compiled for release and the `-w` enables WebRender.
<br /><br />
To see FPS and other stats, run using <br />
`./mach run -w -r -- -Z wr-stats [URL]`


##Contributions Welcome
Add an experiment by branching and then submitting a PR. 


Demos live in the `experiments` directory and are described in `experiments.json`.

An experiment should have its own folder in the `experiments` directory and should minimally contain:
* `index.html` - entry point for the experiment
* `thumb.png` - this file will be used as a screenshot of the demo for use on the homepage.  It should be square and not too large.

The experiment should be described in `experiments.json` by a JSON object with the fields:
* `name` - The name of the experiment.
* `desc` - A short text description of the experiment.
* `href` - The directory of the experiment e.g. `experiments/foo`.
 
For example, for a new experiment `super-cool-experiment`:
* `experiments/super-cool-experiment/index.html` is the entry point of the experiment.
* `experiments/super-cool-experiment/thumb.png` is a square screenshot of the experiment in action, which is used to display the experiment on the homepage.

and the following JSON would be added to `experiments.json`:
 ```JSON
  {
     "name": "Super Cool Experiment",
     "desc": "A super cool experiment which does interesting arbitrary things.",
     "href": "experiments/super-cool-experiment/"
  }
  ```


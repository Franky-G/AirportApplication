# README-FIRST

## Package Managers

To setup your development environment, you will need to install several dependencies on your machine. Please refer to 
the section that applies to you to find a good package manager.

### Linux

In Unix there are several package managers to install software (e.g. `apt`, `snap`). For this class, we recommend using
`apt`. There are several ways to use `apt` to install packages, but by default we will use

```bash
sudo apt-get install [package-name]
```

### Mac Package Manager

For those of you working on Macs, you are able to use the Homebrew package manager, allowing you to install programs 
from the command line, just like Linux. To install Homebrew:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

If the installation failed, ensure you meet the installation requirements
[here](https://docs.brew.sh/Installation.html). The page also has alternative installation instructions if the above 
doesn't work. Once Homebrew is installed, install packages using the following paradigm:

```bash
brew update
brew install <package-name>
```

## Dependencies

In this class, we will use Maven, a build tool for Java, and npm, a dependency manager for JavaScript development.
The following section will describe the installation process for these tools. **The lab machines already have these tools installed.**

### Java

Whether working with Linux or Mac, we recommend directly downloading a JDK and setting your `JAVA_HOME` environment 
variable rather than installing a JDK with a package manager. Use at least version 8. A JDK may be downloaded from
https://jdk.java.net/ or from [Oracle's Site](https://www.oracle.com/technetwork/java/javase/downloads/index.html).

Once you've downloaded and unpacked your JDK (to a directory like `jdk-11/`), you'll want to add the following lines to 
your `.bashrc` (`.bash_profile` for Mac users):

```bash
export JAVA_HOME=/path/to/jdk
export PATH=$JAVA_HOME/bin:$PATH
```

Restart your terminal, and try to run `java -version`. If correctly installed, you should see the proper version coming 
from the JDK you chose.

### Maven

Maven should be available for install through your package manager. On Linux, use 

```bash
sudo apt-get install maven
```

and on Mac use

```bash
brew install maven
```

Binary distributions are available form Maven's [homepage](https://maven.apache.org/)
as well. If you use the binary distribution, make sure to append the `bin/`
directory to your `PATH`, as shown above for Java.

Either way, **setting the `JAVA_HOME` variable as shown above is extremely
important,** as it tells Maven where to look for Java libraries needed to build
your project. 

Restart your terminal, and try to run `mvn --version`. If correctly installed, you should see a report from Maven, 
otherwise, you will either receive and error, or nothing.

### NPM

#### Installing with [NVM](https://github.com/creationix/nvm)

Node Version Manager is a great project that helps you install and keep track of different NodeJS versions. Its use is 
recommended, as it supports both Mac and Linux. Follow the instructions on the repository's 
[front page](https://github.com/creationix/nvm). The command below is copied from the repositories README.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```

Once NVM has been installed (check with `nvm --version`), you can install the latest LTS release of NodeJS with the 
following:

```bash
nvm install --lts

# See What Got Installed
nvm list

# Check To See If You Have NodeJS and NPM
node -v
npm -v
```

#### Installing with Package Manager

If you would prefer to use a package manager to install NodeJS, you can do that as well. There can be issues with using 
this method of installation, and for this reason we recommend the NVM installation documented above.

```bash
brew install node
```

## IntelliJ

[IntelliJ](https://www.jetbrains.com/idea/) is the IDE our company will be using. It has better support for the tools 
we will be using than Eclipse.

### Creating an Account

As students, you can get a license for the ultimate edition of IntelliJ for free. You'll need a free JetBrains Student 
Account. You can sign up for one [here](https://www.jetbrains.com/student/). In addition, when signing up for a 
JetBrains Student Account, you will notice the ability to use your GitHub PRO account to validate with JetBrains. If
you dont have a GitHub PRO account, it is free to use as a student, and at this point it would be a great opportunity to
get one (it is free!).

### IntelliJ installation

There are two versions of IntelliJ, the Community Edition and the Ultimate Edition. Either should work for the scope of 
this project, but the Ultimate Edition integrates better with JavaScript code. As mentioned above, students
have free access to the Ultimate Edition and other Jetbrains products. Either edition can be 
downloaded [from the Jetbrains website](https://www.jetbrains.com/idea/download).

### Launching IntelliJ

IntelliJ is available on the lab machines under the command:

```
/usr/local/idea/bin/idea.sh
```

If you don't want to remember this, you can add an alias to `~/.bashrc`:

```bash
alias intellij="/usr/local/idea/bin/idea.sh"
```

Restart your terminal, and now you can simply type `intellij` to launch.

### Opening the Project

When first opening IntelliJ, a window should open inviting you to open a
project. Select `Check out from version control` and continue to select "GitHub"
from the dropdown.

Refer to our [GitHub guide](https://github.com/csucs314s20/guide/tree/master/guides/git/IntelliJ.md)
for more information on how to clone your project from IntelliJ.

Because we are using Maven, IntelliJ should automatically import all of the
necessary dependencies for the project. This sometimes takes a while, so be
patient. If you need to set your project JDK, refer to the documentation
[here](https://www.jetbrains.com/help/idea/configuring-build-jdk.html).

### Building in IntelliJ

For the most part, the run script should be comprehensive enough to build your
project. [Here](https://www.jetbrains.com/help/idea/working-with-tool-windows.html#tool_window_quick_access)
are some visual instructions on opening a terminal in IntelliJ. In addition, several configuration builds have been 
included with the source files provided to you. Try running each of them and take note of what each one does.

## Run Configurations

### Development

The Webpack dev server allows you to make changes to your JavaScript code
without repackaging it. Additionally, every time you change a file and save it,
the browser that you're viewing the project in will automatically refresh. Note
that this server runs as a process that is completely separate from your JAR.

If you don't set the environment variable `CS314_RUN_MODE`, then the run script will default to development mode. To run the 
server in development mode, invoke the run script as is:

```bash
./bin/run.sh
```

This starts two processes:
* the client code running via `npm run devClient` listening on port 3000
* the server code running via `npm run server` listening on port 8000 

Your default browser should open automatically and display the project's
homepage after a few seconds (notice that it is running on `localhost:3000`).
If you see an error banner displayed at the top, it is likely that your JAR is
running on an unexpected port, or is not running at all.

### Production

The easiest way to run the server and make sure everything works is to use the
run script:

```bash
export CS314_ENV=prod 
./bin/run.sh
```

This will install all npm dependencies (if they haven't been already), bundle
together all of the Javascript source, compile and test your React and Java Code, package
everything into a single JAR, and start running the server on the default port. Visit `http://localhost:8000` 
to see the web page.

Investigate what the run scripts actually do to better understand how our system
is built. All of the commands they run can be run manually as well, to perform a
single step of the build operation only.

### Deployment

Ultimately, you will deploy your production server to a different machine. To
package everything into a single executable jar file to be submitted through
checkin, use the run.sh script with the `-d` flag set:

```bash
./bin/run.sh -d
```

This will create a directory called `target` if it does not already exist and
write the jar file to this directory. This jar can then be copied and ran on 
any other machine with java.

### IntelliJ Run Configurations

In addition to the bash scripts mentioned above, we have provided a set of IntelliJ run configurations for you in
your repository. These can be invoked via the green run button towards the top left of the screen.
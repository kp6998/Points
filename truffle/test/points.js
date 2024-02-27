const Points = artifacts.require("Points");

contract("Points", (accounts) => {
  let pointsInstance;

  beforeEach(async () => {
    pointsInstance = await Points.new();
  });

  it("should register user details", async () => {
    const userName = "testUser";
    const fullName = "John Doe";
    const fatherName = "John Sr.";
    const birthDate = "01/01/1990";

    const result = await pointsInstance.RegUserDetails(userName, fullName, fatherName, birthDate, {
      from: accounts[0],
    });

    assert.equal(result, true, "User details registration failed");

    const userDetails = await pointsInstance.mpUserDetails(userName);
    assert.equal(userDetails.userAddress, accounts[0], "Incorrect user address after registration");
  });

  it("should not register duplicate user details", async () => {
    const userName = "testUser";
    const fullName = "John Doe";
    const fatherName = "John Sr.";
    const birthDate = "01/01/1990";

    await pointsInstance.RegUserDetails(userName, fullName, fatherName, birthDate, {
      from: accounts[0],
    });

    const result = await pointsInstance.RegUserDetails(userName, "New Name", "New Father", "02/02/2000", {
      from: accounts[1],
    });

    assert.equal(result, false, "Duplicate user details registration succeeded");
  });

  it("should set points up", async () => {
    const sender = "senderUser";
    const receiver = "receiverUser";

    await pointsInstance.RegUserDetails(sender, "Sender Full Name", "Sender Father", "01/01/1990", {
      from: accounts[0],
    });

    await pointsInstance.RegUserDetails(receiver, "Receiver Full Name", "Receiver Father", "02/02/2000", {
      from: accounts[1],
    });

    await pointsInstance.SetPointsUp(sender, receiver, { from: accounts[0] });

    const userPoints = await pointsInstance.mpPoints(receiver);
    assert.equal(userPoints.upPoints, 1, "Failed to set points up");
  });

  it("should emit an event when trying to set points up to oneself", async () => {
    const sender = "senderUser";

    await pointsInstance.RegUserDetails(sender, "Sender Full Name", "Sender Father", "01/01/1990", {
      from: accounts[0],
    });

    const result = await pointsInstance.SetPointsUp(sender, sender, { from: accounts[0] });
  });

  it("should return true when user logs in with correct username", async () => {
    const userName = "testUser";
    const fullName = "John Doe";
    const fatherName = "John Sr.";
    const birthDate = "01/01/1990";

    await pointsInstance.RegUserDetails(userName, fullName, fatherName, birthDate, {
      from: accounts[0],
    });

    const isLoggedIn = await pointsInstance.Login(userName, { from: accounts[0] });
    assert.equal(isLoggedIn, true, "Login failed with correct username");
  });

  it("should return false when user logs in with incorrect username", async () => {
    const userName = "testUser";
    const fullName = "John Doe";
    const fatherName = "John Sr.";
    const birthDate = "01/01/1990";

    await pointsInstance.RegUserDetails(userName, fullName, fatherName, birthDate, {
      from: accounts[0],
    });

    const isLoggedIn = await pointsInstance.Login("incorrectUser", { from: accounts[0] });
    assert.equal(isLoggedIn, false, "Login succeeded with incorrect username");
  });
});

//
//  ChapterEditScreenViewController.m
//  WriteMyBook
//
//  Created by Алексей Савельев on 29/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "ChapterEditScreenViewController.h"
#import <React/RCTSurfaceHostingView.h>
#import <React/RCTSurfaceSizeMeasureMode.h>
#import <React/RCTSurface.h>

@interface ChapterEditScreenViewController ()

@end

@implementation ChapterEditScreenViewController {
  RCTBridge *_bridge;
  NSDictionary *_props;
  RCTResponseSenderBlock _feedback;
  UIView *container;
  BOOL isCreatedSurface;
}

- (instancetype)initWithBridge:(RCTBridge *)bridge andProps:(NSDictionary *)props andFeedback:(RCTResponseSenderBlock)feedback {
  self = [super init];
  if (self) {
    _bridge = bridge;
    _props = props;
    _feedback = feedback;
    isCreatedSurface = NO;
  }
  return self;
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  [self.navigationController setNavigationBarHidden:NO animated:YES];
  self.navigationController.navigationBar.barTintColor = [UIColor colorWithRed:0.96 green:0.97 blue:0.98 alpha:1.0];
  self.navigationController.navigationBar.tintColor = [UIColor colorWithRed:0.28 green:0.53 blue:0.78 alpha:1.0];
  
  UIBarButtonItem *saveButton = [[UIBarButtonItem alloc] initWithTitle:@"Save" style:UIBarButtonItemStylePlain target:self action:@selector(onSave)];
  self.navigationItem.rightBarButtonItem = saveButton;
}

- (void)onSave {
  _feedback(@[_props[@"id"]]);
  [self.navigationController popViewControllerAnimated:YES];
}

- (void)viewWillDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view.
  
  self.view.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  container = [[UIView alloc] init];
  container.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.view addSubview:container];
  
  if (@available(iOS 11.0, *)) {
    [container.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor].active = YES;
    [container.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor].active = YES;
    [container.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor].active = YES;
    [container.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor].active = YES;
  } else {
    [container.topAnchor constraintEqualToAnchor:self.topLayoutGuide.bottomAnchor].active = YES;
    [container.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor].active = YES;
    [container.leadingAnchor constraintEqualToAnchor:self.view.layoutMarginsGuide.leadingAnchor].active = YES;
    [container.trailingAnchor constraintEqualToAnchor:self.view.layoutMarginsGuide.trailingAnchor].active = YES;
  }
}

- (void)viewDidLayoutSubviews {
  if (!isCreatedSurface) {
    RCTSurfaceHostingView *view = [[RCTSurfaceHostingView alloc] initWithBridge:_bridge moduleName:@"ChapterEditScreen" initialProperties:_props sizeMeasureMode:RCTSurfaceSizeMeasureModeWidthExact | RCTSurfaceSizeMeasureModeHeightExact];
    
    CGSize minimumSize = (CGSize){0, 0};
    CGSize maximumSize = (CGSize){container.frame.size.width, container.frame.size.height};
    [view.surface setMinimumSize:minimumSize maximumSize:maximumSize];
    
    view.translatesAutoresizingMaskIntoConstraints = NO;
    
    [container addSubview:view];
    isCreatedSurface = YES;
  }
}

@end
